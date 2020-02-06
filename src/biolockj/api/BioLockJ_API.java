package biolockj.api;

import java.io.File;
import java.io.OutputStream;
import java.io.PrintStream;
import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import biolockj.Config;
import biolockj.Properties;
import biolockj.exception.BioLockJException;
import biolockj.exception.ConfigException;
import biolockj.module.BioModule;
import biolockj.util.BioLockJUtil;
import biolockj.util.ModuleUtil;
import org.json.JSONArray;
import org.json.JSONObject;
import org.reflections.Reflections;

public class BioLockJ_API {

	private static String query;
	private static final String LIST_MODULES = "listModules";
	private static final String LIST_API_MODULES = "listApiModules";
	private static final String LIST_PROPS = "listProps";
	private static final String LIST_ALL_PROPS = "listAllProps";
	private static final String VALIDATE_PROP = "isValidProp";
	private static final String PROP_TYPE = "propType";
	private static final String PROP_VALUE = "propValue";
	private static final String PROP_DESC = "describeProp";
	private static final String PROP_INFO = "propInfo";
	private static final String MODULE_INFO = "moduleInfo";
	private static final String HELP = "help";

	private static boolean verbose = false;

	private BioLockJ_API() {}

	public static void main( String[] args ) throws Exception {
		try {
			if (args.length < 1) throw new API_Exception(getHelp());
			query = args[0];
			String reply = "";
			switch( query ) {
				case LIST_MODULES:
					reply = listToString( listModules() );
					break;
				case LIST_API_MODULES:
					reply = listToString( listApiModules( ) );
					break;
				case LIST_PROPS:
					if (args.length == 1) reply = listToString( ListProps( ) );
					else if (args.length ==2 ) reply = listToString( listModuleProps( args[1] ) );
					else throw new API_Exception("The query [" + LIST_PROPS + "] should be follwed by 0 or 1 arg.");
					break;
				case LIST_ALL_PROPS:
					if (args.length > 2) throw new API_Exception( "The query [" + LIST_ALL_PROPS + "] should be follwed by 0 or 1 arg." );
					Set<String> allProps = new HashSet<>();
					allProps.addAll(ListProps( ));
					for (String mod : listApiModules()) {
						ApiModule tmp = (ApiModule) ModuleUtil.createModuleInstance( mod );
						allProps.addAll( tmp.listProps() );
					}
					ArrayList<String> allPropsOrderd = new ArrayList<>(allProps);
					Collections.sort(allPropsOrderd);
					reply = listToString( allPropsOrderd );
					break;
				case VALIDATE_PROP:
					if (args.length < 3) {
						throw new API_Exception("The query [" + VALIDATE_PROP + "] requires at least two arguments: a property and a value.");
					}
					Boolean isGood = isValidProp(args);
					if( isGood == null ) {
						reply = "null";
					} else if( isGood.booleanValue() == true ) {
						reply = "true";
					} else {
						reply = "false";
					}
					break;
				case PROP_TYPE:
					if (args.length == 2) reply = Properties.getPropertyType( args[1] );
					else if (args.length == 3 || args.length == 4) reply = propTypeModule( args[1], args[2] );
					else throw new API_Exception( "The query [" + PROP_TYPE + "] requires one or two arguments." );
					break;
				case PROP_DESC:
					if (args.length == 2) reply = Properties.getDescription( args[1] );
					else if (args.length == 3 || args.length == 4) reply = propDescModule( args[1], args[2] );
					else throw new API_Exception( "The query [" + PROP_DESC + "] requires one or two arguments." );
					break;
				case PROP_VALUE:
					if (args.length < 2) throw new API_Exception( "The query [" + PROP_VALUE + "] requires one or two arguments." );
					if (args.length == 2) initConfig();
					else if (args.length == 3) initConfig(args[2]);
					reply = propValue( args[1] );
					break;
				case PROP_INFO:
					reply = propInfo().toString(2);
					break;
				case MODULE_INFO:
					reply = moduleInfo().toString(2);
					break;
				case HELP:
					reply = getHelp();
					break;
				default:
					reply = "\"" + query + "\" is not a recognized query term." + System.lineSeparator() + getHelp();
			}
			System.out.println( reply );
		} catch( API_Exception | BioLockJException ex ) {
			System.err.println( ex.getMessage() );
		} catch( Exception e ) {
			System.err.println( "An unexpected error occurred; your query could not be processed." );
			throw e;
		}
	}
	
	public static void setVerbose(boolean writeLots) {
		verbose = writeLots;
	}
	
	private static String listToString( Iterable<? extends Object> elements ) {
		ArrayList<String> output = new ArrayList<>();
		for (Object elem : elements ) {
			if (elem instanceof Class) {
				output.add( ( (Class<?>) elem).getName() );
			}else if (elem instanceof CharSequence) {
				output.add( ( (CharSequence) elem).toString() );
			}else {
				output.add( elem.toString() );
			}
		}
		return( String.join( System.lineSeparator(), output ) );
	}
	
	
	/**
	 * Return a list of all the modules on the class path.
	 * @param args
	 * @return
	 * @throws Exception 
	 */
	public static List<String> listModules() throws Exception {
		List<String> allBioModules = new ArrayList<>();

		Reflections reflections = supressStdOut_createReflections();
		
		Set<Class<? extends BioModule>> subTypes = reflections.getSubTypesOf( BioModule.class );
		for (Class<? extends BioModule> st : subTypes ) {
			try {
				BioModule tmp = ModuleUtil.createModuleInstance( st.getName() );
				allBioModules.add( tmp.getClass().getName() );
			}catch(InstantiationException | ExceptionInInitializerError ex) {
				//System.err.println("The class [" + st.getName() + "] is in scope, but cannot be instantiated.");
			}	
		}
		
		Collections.sort(allBioModules);
		return allBioModules;
	}
	
	private static Reflections supressStdOut_createReflections() {
		PrintStream classicOut = System.out;
		PrintStream classicErr = System.err;
		
		if (verbose) {
			System.setOut( classicErr );
		}else {
			System.setOut(new PrintStream(new OutputStream() {
				  public void write(int b) {}
				}));
			System.setErr( new PrintStream(new OutputStream() {
				  public void write(int b) {}
				}));
		}
		
		Reflections reflections = new Reflections("");

		System.setOut(classicOut);
		System.setErr(classicErr);
		
		return reflections;
	}
	
	/**
	 * Like listModules, but only include modules that implement the ApiModule interface.
	 * @param args
	 * @return
	 * @throws Exception 
	 */
	public static List<String> listApiModules() throws Exception {
		List<String> allBioModules = listModules();
		List<String> apiModules = new ArrayList<>();
		for (String mod : allBioModules ) {
			BioModule tmp = ModuleUtil.createModuleInstance( mod );
			if (tmp instanceof ApiModule) {
				apiModules.add( tmp.getClass().getName() );
			}
		}
		return apiModules;
	}
	
	
	public static List<String> ListProps() throws API_Exception{
		List<String> allProps = new ArrayList<>();
		allProps.addAll( Properties.getPropTypeMap().keySet() );
		Collections.sort(allProps);
		return allProps;
	}
	public static List<String> listModuleProps(String mod) throws Exception {
		List<String> allProps = new ArrayList<>();
		BioModule tmp = ModuleUtil.createModuleInstance( mod );
		if (tmp instanceof ApiModule) {
			allProps.addAll( ( (ApiModule) tmp ).listProps() );
		}
		return allProps;
	}
	
	/**
	 * The bash component of this function can take 0 or more modules;
	 * AND the last arg may not be a module, 
	 * it may be the directory path for the external modules, which we would ignore here.
	 * This method converts the (String[]) into (String, String, String[]) signature. 
	 * @param args
	 * @return
	 * @throws Exception
	 */
	private static Boolean isValidProp(String[] args) throws Exception {
		String last = args[args.length - 1];
		boolean lastArgIsDir = (new File(last)).exists();
		int numMods = lastArgIsDir ? args.length - 4 : args.length - 3;
		String[] modules = new String[numMods];
		if (numMods > 0) {
			for (int i=0; i < numMods; i++) {
				int j = i + 3;
				modules[i] = args[ j ];
			}
		}
		//recall that args[0] is the query term.
		return isValidProp(args[1], args[2], modules);
	}
	
	/**
	 * Returns true if the 
	 * @param prop - a config property
	 * @param val - a proposed value for prop
	 * @param modules - if not empty, the property/val pair is validated by one or more modules, in addition to the biolockj backbone.
	 * @return
	 * @throws Exception 
	 */
	public static Boolean isValidProp(String prop, String val, String[] modules) throws Exception {
		Config.initBlankProps();
		Config.setConfigProperty( prop, val );
		
		Boolean isValid = Properties.isValidProp(prop);
		
		if (modules.length > 0) {
			for (String mod : modules) {
				BioModule tmp = ModuleUtil.createModuleInstance( mod );
				if (tmp instanceof ApiModule) {
					Boolean modVote;
					try {
						modVote = ( (ApiModule) tmp).isValidProp( prop );
					}catch(ConfigException e) {
						modVote = false;
					}
					if (isValid == null) isValid = modVote;
					else if (modVote != null) isValid = modVote && isValid;
				}
			}
		}
		return isValid;
	}
	
	/**
	 * Returns a string describing the format type that required for the value of the property given.
	 * The first String in args is taken as the property of interest.
	 * The second string is a module 
	 * the property type is queried for that module rather than the BioLockJ backbone.
	 * @param args - 
	 * @return
	 * @throws API_Exception 
	 */
	public static String propTypeModule(String prop, String module) throws API_Exception {
		String type = "";
		try {
			BioModule tmp = ModuleUtil.createModuleInstance( module );
			if (tmp instanceof ApiModule) {
				type = ( (ApiModule) tmp ).getPropType( prop );
			}
		}catch(ClassNotFoundException ex ) {
			throw new API_Exception("Module class [" + module + "] could not be found.");
		} catch( Exception e ) {
			throw new API_Exception("There was ap problem getting the type for ["+ prop + "] from class [" + module + "].");
		}
		return type; 
	}
	
	public static String propDescModule(String prop, String module) throws API_Exception {
		String desc = "";
		try {
			BioModule tmp = ModuleUtil.createModuleInstance( module );
			if (tmp instanceof ApiModule) {
				desc = ( (ApiModule) tmp ).getDescription( prop );
			}
		}catch(ClassNotFoundException ex ) {
			throw new API_Exception("Module class [" + module + "] could not be found.");
		} catch( Exception e ) {
			throw new API_Exception("There was ap problem getting the description for ["+ prop + "] from class [" + module + "].");
		}
		return desc; 
	}
	
	/**
	 * Returns the value for that property (first String)
	 * If a second argument is given, it is assumed to be the primary config file.
	 * @param args
	 * @return
	 * @throws Exception 
	 */
	public static String propValue(String property) throws Exception {
		return Config.getString( null, property );
	}

	private static void initConfig(String path) throws Exception {
		File config = new File(path);
		if (!config.exists()) throw new API_Exception( "Cannot find configuration file: " + path );
		Config.partiallyInitialize(config);
	}
	private static void initConfig() throws Exception {
		File tempConfig = File.createTempFile( "tempconfig", "properties" );
		Config.partiallyInitialize(tempConfig);
		tempConfig.delete();
	}
	
	/**
	 * For each of the properties registered to the Properties class, 
	 * report the property name, type, description and default value.
	 * @return
	 * @throws Exception
	 */
	public static JSONArray propInfo() throws Exception {
		HashMap<String, String> propDescMap = Properties.getPropDescMap();
		List<String> props = new ArrayList<>(propDescMap.keySet());
		initConfig();
		JSONArray jarray = new JSONArray();
		for (String prop : props) {
			HashMap<String, String> propAtts = new HashMap<>();
			propAtts.put("property", prop);
			propAtts.put("type", Properties.getPropertyType( prop ));
			propAtts.put("description", Properties.getDescription( prop ));
			propAtts.put("default", propValue(prop));
			JSONObject jobj = new JSONObject( propAtts );
			jarray.put( jobj );
		}
		return jarray;
	}
	
	/**
	 * Returns a json formatted list of all modules and for each module that 
	 * implements the gui interface, it lists the props used by the module,
	 * and for each prop the info.
	 * @param args
	 * @return
	 * @throws Exception 
	 */
	public static JSONArray moduleInfo() throws Exception {
		initConfig();
		List<String> modules = listApiModules();
		JSONArray modsArray = new JSONArray();
		for (String mod : modules) {
			BioModule tmp = biolockj.util.ModuleUtil.createModuleInstance( mod );
			HashMap<String, Object> modAtts = new HashMap<>();
			
			modAtts.put("usage", "#BioModule " + mod );		
			try {
				modAtts.put("pre-req modules", tmp.getPreRequisiteModules() );
				modAtts.put("post-req modules", tmp.getPostRequisiteModules() );
			}catch(Exception e) {}
			
			if (tmp instanceof ApiModule) {
				modAtts.put("description", ((ApiModule) tmp).getDescription() );
				modAtts.put("details", ((ApiModule) tmp).getDetails() );
				modAtts.put("citation", ((ApiModule) tmp).getCitationString() );
				modAtts.put("title", ((ApiModule) tmp).getTitle() );
				
				List<String> props = listModuleProps( mod );
				JSONArray modProps = new JSONArray();
				for (String prop : props) {
					HashMap<String, String> propAtts = new HashMap<>();
					propAtts.put("property", prop);
					propAtts.put("type", Properties.getPropertyType( prop ));
					propAtts.put("description", Properties.getDescription( prop ));
					propAtts.put("default", propValue(prop));
					modProps.put( propAtts );
				}
				modAtts.put( "properties", modProps );
			}

			JSONObject jModAtts = new JSONObject( modAtts );
			modsArray.put( jModAtts );
		}
		return modsArray; //return json; convert to string in switch case.
	}
	
	/**
	 * Print the help menu explaining how to use this tool.
	 * @return
	 */
	private static String getHelp() {
		StringBuffer sb = new StringBuffer();
		sb.append( "BioLockJ API " + BioLockJUtil.getVersion( ) + " - UNCC Fodor Lab" +System.lineSeparator() );
		sb.append( System.lineSeparator() );
		sb.append( "Usage:" +System.lineSeparator() );
		sb.append( "biolockj-api <query> [args...]" +System.lineSeparator() );
		sb.append( System.lineSeparator() );
		sb.append( "For some uses, redirecting stderr is recommended:" +System.lineSeparator() );
		sb.append( "biolockj-api <query> [args...]  2> /dev/null" +System.lineSeparator() );
		sb.append( System.lineSeparator() );
		sb.append( "Use biolockj-api without args to get help menu." +System.lineSeparator() );
		sb.append( System.lineSeparator() );
		sb.append( "query:" +System.lineSeparator() );
		sb.append( System.lineSeparator() );
		sb.append( "  " + LIST_MODULES + " [extra_modules_dir]" +System.lineSeparator() );
		sb.append( "        Returns a list of classpaths to the classes that extend BioModule." +System.lineSeparator() );
		sb.append( "        Optionally supply the path to a directory containing additional modules." +System.lineSeparator() );
		sb.append( System.lineSeparator() );
		sb.append( "  " + LIST_API_MODULES + " [extra_modules_dir]" +System.lineSeparator() );
		sb.append( "        Like listModules but limit list to modules that implement the ApiModule interface." +System.lineSeparator() );
		sb.append( System.lineSeparator() );
		sb.append( "  " + LIST_PROPS + " [module]" +System.lineSeparator() );
		sb.append( "        Returns a list of properties." +System.lineSeparator() );
		sb.append( "        If no args, it returns the list of properties used by the BioLockJ backbone." +System.lineSeparator() );
		sb.append( "        If a modules is given, then it returns a list of all properties used by" +System.lineSeparator() );
		sb.append( "        that module." +System.lineSeparator() );
		sb.append( System.lineSeparator() );
		sb.append( "  " + LIST_ALL_PROPS + " [extra_modules_dir]" +System.lineSeparator() );
		sb.append( "        Returns a list of all properties, include all backbone properties and all module properties." +System.lineSeparator());
		sb.append( "        Optionally supply the path to a directory containing additional modules to include their properties." +System.lineSeparator() );
		sb.append( System.lineSeparator() );
		sb.append( "  " + PROP_TYPE + " <prop> [module [extra_modules_dir] ]" +System.lineSeparator() );
		sb.append( "        Returns the type expected for the property: String, list, integer, positive number, etc." +System.lineSeparator() );
		sb.append( "        If a module is supplied, then the modules propType method is used." +System.lineSeparator() );
		sb.append( System.lineSeparator() );
		sb.append( "  " + PROP_DESC + " <prop> [module [extra_modules_dir] ]" +System.lineSeparator() );
		sb.append( "        Returns a description of the property." +System.lineSeparator() );
		sb.append( "        If a module is supplied, then the modules getDescription method is used." +System.lineSeparator() );
		sb.append( System.lineSeparator() );
		sb.append( "  " + PROP_VALUE + " <prop> [confg]" +System.lineSeparator() );
		sb.append( "        Returns the value for that property given that config file (optional) or " +System.lineSeparator() );
		sb.append( "        no config file (ie the default value)" +System.lineSeparator() );
		sb.append( System.lineSeparator() );
		sb.append( "  " + VALIDATE_PROP + " <prop> <val> [module] [modules…] [extra_modules_dir]" +System.lineSeparator() );
		sb.append( "        T/F/NA. Returns true if the value (val) for the property (prop) is valid;" +System.lineSeparator() );
		sb.append( "        false if prop is a property but val is not a valid value," +System.lineSeparator() );
		sb.append( "        and NA if prop is not a recognized property." +System.lineSeparator() );
		sb.append( "        IF a module is supplied, then additionally call the validateProp(key, value)" +System.lineSeparator() );
		sb.append( "        for each module given." +System.lineSeparator() );
		sb.append( System.lineSeparator() );
		sb.append( "  " + PROP_INFO + System.lineSeparator() );
		sb.append( "        Returns a json formatted list of the general properties (listProps)" +System.lineSeparator() );
		sb.append( "        with the type, descrption and default for each property" +System.lineSeparator() );
		sb.append( System.lineSeparator() );
		sb.append( "  " + MODULE_INFO + " [extra_modules_dir]" +System.lineSeparator() );
		sb.append( "        Returns a json formatted list of all modules and for each module that " +System.lineSeparator() );
		sb.append( "        implements the ApiModule interface, it lists the props used by the module," +System.lineSeparator() );
		sb.append( "        and for each prop the type, descrption and default." +System.lineSeparator() );
		sb.append( System.lineSeparator() );
		sb.append( "  " + HELP + "  (or no args)" +System.lineSeparator() );
		sb.append( "        Print help menu." +System.lineSeparator() );
		sb.append( System.lineSeparator() );

		return sb.toString(); 
	}

}
