package biolockj.api;

import java.util.List;
import biolockj.module.BioModule;

public interface ApiModule extends BioModule {
	
	/**
	 * A string used to insert a separation point within a description.
	 * This is used to (optionally) indicate where to truncate the description to produce a short description.
	 */
	public static final String endShortDesc = "<br><br>";

	/**
	 * Tests to see if the value val is valid for property prop.
	 * @param property
	 * @param value
	 * @return true if value is recognized and good, false if it is recognized and invalid, null if prop is not recognized.
	 * @throws Exception
	 */
	public Boolean isValidProp(String property) throws Exception;
	
	/**
	 * List properties that this module uses, including those called by any super class.
	 * @return
	 */
	public List<String> listProps();

	/**
	 * Get a human readable name for this module.
	 * @return
	 */
	public String getTitle();

	/**
	 * Briefly describe what this module does.
	 * The entire text is shown in the user guide.
	 * If the String {@value endShortDesc} is used, some functions may truncate the description at that point. 
	 * @return
	 */
	public String getDescription();

	/**
	 * Describe a given property / how it is used (including how it is used by a super class)
	 * @return
	 */
	public String getDescription(String prop) throws API_Exception;
	
	public String getDetails();
	
	/**
	 * Get the type for a given property.
	 * @return
	 */
	public String getPropType(String prop) throws API_Exception;
	
	/**
	 *  At a minimum, this should return the name and/or url for the wrapped tool.
	 *  For BioLockJ home-grown modules, it can cite BioLockJ and give the current version.
	 *  Ideally this will include the version for the wrapped tool. Tool version may require using
	 *  a stored variable that can be filled in during execution; and the string that is returned pre-execution may not have the version.
	 * @return
	 */
	public String getCitationString();
	
}
