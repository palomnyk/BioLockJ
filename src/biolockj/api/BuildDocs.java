package biolockj.api;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import biolockj.Properties;
import biolockj.module.BioModule;
import biolockj.util.ModuleUtil;

/**
 * This class handles the components of the user guide that should not be manually maintained.
 * For pages that show the help menu, this creates the page with the current help menu.
 * For modules, it generates a user guide page based on the ApiModule methods.  
 * For non-ApiModule BioModules, it creates a stub.
 * For the BioLockJ team, this is part of the standard deploy process so that these user guide pages reflect the current code base.
 * 
 * For other module developers, this class be used to generate documentation for any and all modules.
 * For example, if you create a package joes.modules with several BioModules, you could generate the user guide pages using:<br>
 * java -cp $BLJ/dist/BioLockJ.jar:path/to/your/modules.jar biolockj.api.BuildDocs docs/GENERATED joes.modules
 * 
 * @author Ivory Blakley
 *
 */
public class BuildDocs {

	/**
	 *  For standard use case, pass in $BLJ/mkdocs/user-guide/docs/GENERATED
	 * @param args first art is baseDir - the folder where the output should be saved. 
	 * If a second arg, it should be the package root for generating the documentation for a third-party package.
	 * @throws Exception
	 */
	public static void main( String[] args ) throws Exception {
		
		if (args.length == 0) {
			throw new API_Exception( "At least one argument is required - the output directory where .md files shoudl bed saved" 
							+ System.lineSeparator() + "Try: mkdocs/user-guide/docs/GENERATED");
		}
		// set the base directory for the .md outputs
		baseDir = new File( args[0] );
		if ( !baseDir.exists() ) {
			throw new API_Exception( "Please supply a valid output directory." + System.lineSeparator() 
			+ "Could not find location: \"" + baseDir.getAbsolutePath() + "\" "); 
		}
		if ( !baseDir.isDirectory() ) {
			throw new API_Exception( "Please supply a valid output directory." + System.lineSeparator() 
			+ "Supplied location is not a directory: \"" + baseDir.getAbsolutePath() + "\" "); 
		}
		
		if ( args.length == 1 ) {
			//standard case
			System.err.println("Will generate documentation for all in-scope modules and the help menu pages.");
			makeModuleDocs( BioLockJ_API.listModules() );
			
			System.err.println("Help menu pages:");
			generateBiolockjHelpPage();
			generateApiHelpPage();
			
		}else if (args.length == 2) {
			//rare case
			basePackage = args[1];
			System.err.println("Will generate documentation for modules with classpath beginning: " + basePackage);
			List<String> allModules = BioLockJ_API.listModules(basePackage);
			if (allModules.size() == 0 ) {
				throw new API_Exception("No modules were found with classes beginning with \"" + basePackage + "\".");
			}
			makeModuleDocs( allModules );
		}else {
			throw new API_Exception("Too many args! args: " + args);
		}
	}
	
	private static void makeModuleDocs(List<String> allModules) throws Exception {
		for (String mod : allModules) {
			System.err.println("Creating documentation page for module: " + mod);
			BioModule tmp = ModuleUtil.createModuleInstance( mod );
			if (tmp instanceof ApiModule) {
				createUserGuidePage( mod );
			}else {
				createStubPage( mod );
			}
		}
		generateAllModulesPage(allModules);
	}
	
	private static void createUserGuidePage(String modulePath) throws Exception {
		ApiModule tmp = (ApiModule) ModuleUtil.createModuleInstance( modulePath );
		File dest = getPageLocation(modulePath);
		System.err.println("Saving document to file: " + dest );
		FileWriter writer = new FileWriter( dest );
		
		writer.write( "# " + tmp.getTitle() + System.lineSeparator() );
		writer.write( "Add to module run order: " + markDownReturn );
		writer.write( "`#BioModule " + modulePath + "`" + System.lineSeparator() );
		writer.write( System.lineSeparator() );
		
		writer.write( "## Description " + System.lineSeparator() );
		writer.write( tmp.getDescription() + System.lineSeparator() );
		writer.write( System.lineSeparator() );
		
		List<String> generalProps = BioLockJ_API.listProps();
		List<String> moduleProps = new ArrayList<>();
		List<String> modulesGeneralProps = new ArrayList<>();
		for ( String prop : tmp.listProps() ) {
			if ( generalProps.contains( prop ) ) {
				modulesGeneralProps.add( prop );
				// if a module adds to the description of a general property, show it that prop with the module props.
				if ( ! Properties.getDescription( prop ).equals( tmp.getDescription( prop ) ) ) {
					moduleProps.add(prop);
				}
			}else {
				moduleProps.add(prop);
			}
		}
		writer.write( "## Properties " + System.lineSeparator() );
		writer.write( "*Properties are the `name=value` pairs in the configuration file.*" + markDownReturn );
		writer.write( "*These control how the pipeline is executed.*" + System.lineSeparator() );
		writer.write( "### " + tmp.getTitle() + " properties: " + System.lineSeparator() );
		if (moduleProps.size()==0) writer.write( NONE + System.lineSeparator() );
		else writePropsTable(moduleProps, tmp, writer);
		writer.write( System.lineSeparator() );
		
		writer.write( "### General properties applicable to this module: " + System.lineSeparator() );
		if (modulesGeneralProps.size()==0) writer.write( NONE + System.lineSeparator() );
		else writePropsTable(modulesGeneralProps, tmp, writer);
		writer.write( System.lineSeparator() );
		
		writer.write( "## Details " + System.lineSeparator() );
		String details = tmp.getDetails();
		if ( details == null || details.isEmpty() ) details = NONE;
		writer.write( details + System.lineSeparator() );
		writer.write( System.lineSeparator() );
		
		writer.write( "## Adds modules " + System.lineSeparator() );
		writer.write( "**pre-requisit modules** " + markDownReturn );
		List<String> preMods = getPrePostReqModules(tmp, true);
		for (String mod : preMods ) {
			writer.write( mod + markDownReturn );
		}
		writer.write( "**post-requisit modules** " + markDownReturn );
		List<String> postMods = getPrePostReqModules(tmp, false);
		for (String mod : postMods ) {
			writer.write( mod + markDownReturn );
		}
		writer.write( System.lineSeparator() );
		
		writer.write( "## Citation " + System.lineSeparator() );
		String citation = tmp.getCitationString().replaceAll( System.lineSeparator(), markDownReturn );
		if ( citation == null || citation.isEmpty() ) citation = NONE;
		writer.write( citation + System.lineSeparator() );
		writer.write( System.lineSeparator() );
		
		writer.close();		
	}
	
	private static File getPageLocation(String modPath) throws IOException {
		int sep = modPath.lastIndexOf( "." );
		File dir = new File(baseDir, modPath.substring( 0, sep ));
		dir.mkdir();
		File file = new File(dir, modPath.substring( sep + 1 ) + ".md");
		return file;
	}
	
	private static String getInternalLink(String modPath) throws IOException {
		File page = getPageLocation( modPath );
		String parentDir = (baseDir).getAbsolutePath() + "/";
		String link = page.getAbsolutePath().replaceFirst( parentDir, "" );
		return link;
	}
	
	private static List<String> getPrePostReqModules( final BioModule module, boolean pre ) {
		List<String> mods = new ArrayList<>();
		try {
			if (pre) {
				mods.addAll( module.getPreRequisiteModules() );
			}else{
				mods.addAll( module.getPostRequisiteModules() );
			}
		}catch(Exception e) {
			mods.add( "*pipeline-dependent*" );
		}finally {
			if (mods.size() == 0) {
				mods.add( "*none found*" );
			}
		}
		return mods;
	}
	
	private static void writePropsTable(List<String> props, ApiModule module, FileWriter writer) throws Exception {
		writer.write( "| Property| Description |" + System.lineSeparator() );
		writer.write( "| :--- | :--- |" + System.lineSeparator() );
		for ( String prop : props ) {
			writer.write( "| *" + prop + "* | *" + module.getPropType( prop ) + "* " + inCellReturn
				+ module.getDescription(prop) + inCellReturn
				+ "*default:  " + BioLockJ_API.propValue( prop, null, module) + "* |" + System.lineSeparator() );	
		}
	}
	
	private static void generateAllModulesPage(List<String> allModules) throws Exception {
		System.err.println("Module List Page:");
		File file = new File(baseDir, ALL_MODS_DOC);
		file.createNewFile();
		FileWriter writer = new FileWriter( file );
		System.err.println("Saving all-modules list to file: " + file );
		writer.write( "# All Modules" + System.lineSeparator());
		writer.write( "*This is an auto-generated list of all modules with links to auto-generated module documentation.*" + System.lineSeparator());
		writer.write( System.lineSeparator());
		
		List<String> lines = new ArrayList<>();
		for (String modulePath : allModules ) {
			BioModule module = ModuleUtil.createModuleInstance( modulePath );
			String title, link, desc;
			if (module instanceof ApiModule) {
				title = ((ApiModule) module).getTitle();
				desc = " - *" + ((ApiModule) module).getDescription() + "*";
			}else {
				title = ModuleUtil.displayName( module );
				desc = "";
			}
			link = getInternalLink( modulePath );
			lines.add( "[" + title + "](" + link + ")" + desc );
		}
		
		Collections.sort(lines);
		for (String line : lines ) {
			writer.write(line + markDownReturn );
		}
		
		writer.close();
		System.err.println("Done writing all-modules list." );
	}
	
	private static void createStubPage(String modulePath) throws Exception {
		BioModule module = ModuleUtil.createModuleInstance( modulePath );
		File dest = getPageLocation(modulePath);
		System.err.println("Saving document to file: " + dest );
		FileWriter writer = new FileWriter( dest );
		
		writer.write( "# " + ModuleUtil.displayName( module ) + System.lineSeparator() );
		writer.write( "Add to module run order: " + markDownReturn );
		writer.write( "`#BioModule " + modulePath + "`" + System.lineSeparator() );
		writer.write( System.lineSeparator() );
		
		writer.write( "*This page is a place holder.*" + markDownReturn);
		writer.write( "*This module does not have a properly generated user guide page because it does not implement the ApiModule interface.*" + markDownReturn );
		writer.write( "*There may be a manually created page elsewhere.*" + System.lineSeparator() );
		writer.write( System.lineSeparator() );
		
		writer.write( "## Adds modules " + System.lineSeparator() );
		writer.write( "**pre-requisit modules** " + markDownReturn );
		List<String> preMods = getPrePostReqModules(module, true);
		for (String mod : preMods ) {
			writer.write( mod + markDownReturn );
		}
		writer.write( "**post-requisit modules** " + markDownReturn );
		List<String> postMods = getPrePostReqModules(module, false);
		for (String mod : postMods ) {
			writer.write( mod + markDownReturn );
		}
		writer.write( System.lineSeparator() );
		
		writer.close();
	}
	
	private static void generateBiolockjHelpPage() throws IOException, InterruptedException {
		File file = new File(baseDir, biolockj_help);
		System.err.println("Creating file: " + file.getPath() );
		file.createNewFile();
		FileWriter writer = new FileWriter(file);
		String cmd = "biolockj --help";
		
		writer.write( "The `biolockj` help menu:" + markDownReturn );
		writer.write( System.lineSeparator() );
		writer.write( "```bash" + markDownReturn );
		writer.write( cmd + markDownReturn );
		writer.write( "```" + markDownReturn );
		writer.write( System.lineSeparator() );
		writer.write( "```bash" + markDownReturn );
		
		writeCommandOutputToFile(cmd, writer);
		
		writer.write( System.lineSeparator() );
		writer.write( "```" + markDownReturn );
		writer.close();
		
		System.err.println("Done: " + file.getName());
	}
	
	private static void writeCommandOutputToFile(String cmd, FileWriter writer) throws IOException, InterruptedException {
		final Process p = Runtime.getRuntime().exec( cmd ); 
		final BufferedReader br = new BufferedReader( new InputStreamReader( p.getInputStream() ) );
		String s = null;
		while( ( s = br.readLine() ) != null )
		{
			writer.write( s.replaceAll( System.lineSeparator(), markDownReturn ) + markDownReturn );
		}
		p.waitFor();
		p.destroy();
	}
	
	private static void generateApiHelpPage() throws IOException, InterruptedException {
		File file = new File(baseDir, biolockj_api_help);
		System.err.println("Creating file: " + file.getPath() );
		file.createNewFile();
		FileWriter writer = new FileWriter(file);
		String cmd = "biolockj-api help";		
		
		writer.write( "# BioLockJ API" + markDownReturn );
		writer.write( "" + markDownReturn );
		writer.write( "BioLockJ comes with an API." + markDownReturn );
		writer.write( "" + markDownReturn );
		writer.write( "For the most up-to-date information about how to use the API, see the help menu:" + markDownReturn );
		writer.write( "`biolockj_api help`" + markDownReturn );
		writer.write( "" + markDownReturn );
		
		writer.write( "```bash" + markDownReturn );
		writeCommandOutputToFile(cmd, writer);
		writer.write( "```" + markDownReturn );
		
		writeCommandOutputToFile("cat mkdocs/user-guide/docs/partials/BioLockJ-Api_footer.md", writer);

		writer.close();
		
		System.err.println("Done: " + file.getName());
	}

	private static final String NONE = "*none*";
	
	private static final String markDownReturn = "                   " + System.lineSeparator();
	
	private static final String inCellReturn = "<br>";
	
	private static final String ALL_MODS_DOC = "all-modules.md";
	private static final String biolockj_help = "biolockj-help.md";
	private static final String biolockj_api_help = "BioLockJ-Api.md";
		
	private static File baseDir;
	private static String basePackage = null;

}
