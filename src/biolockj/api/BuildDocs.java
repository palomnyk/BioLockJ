package biolockj.api;

import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import biolockj.Properties;
import biolockj.module.BioModule;
import biolockj.util.ModuleUtil;

public class BuildDocs {

	// pass in $BLJ/mkdocs/user-guide/docs/GENERATED
	public static void main( String[] args ) throws Exception {
		// set the base directory for the .md documentation
		baseDir = args[0];
		// for each api module, create a .md file for the user guide
		for (String mod : BioLockJ_API.listApiModules()) {
			System.err.println("Creating documentation for module: " + mod);
			createUserGuidePage( mod );
		}
		
		generateAllModulesPage();

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
		File base = new File( baseDir );		
		int sep = modPath.lastIndexOf( "." );
		File dir = new File(base, modPath.substring( 0, sep ));
		dir.mkdir();
		File file = new File(dir, modPath.substring( sep + 1 ) + ".md");
		return file;
	}
	
	private static String getInternalLink(String modPath) throws IOException {
		File page = getPageLocation( modPath );
		String parentDir = (new File(baseDir)).getAbsolutePath() + "/";
		String link = page.getAbsolutePath().replaceFirst( parentDir, "" );
		return link;
	}
	
	private static List<String> getPrePostReqModules( ApiModule module, boolean pre ) {
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
	
	private static void generateAllModulesPage() throws Exception {
		File file = new File(baseDir, ALL_MODS_DOC);
		file.createNewFile();
		FileWriter writer = new FileWriter( file );
		System.err.println("Saving all-modules list to file: " + file );
		writer.write( "# All Modules" + System.lineSeparator());
		writer.write( "*Comprehensive list of all modules packaged with BioLockJ with links to auto-generated module documentation.*" + System.lineSeparator());
		writer.write( System.lineSeparator());
		
		List<String> lines = new ArrayList<>();
		for (String modulePath : BioLockJ_API.listModules()) {
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
	

	private static final String NONE = "*none*";
	
	private static final String markDownReturn = "                   " + System.lineSeparator();
	
	private static final String inCellReturn = "<br>";
	
	private static final String ALL_MODS_DOC = "all-modules.md";
		
	private static String baseDir;

}
