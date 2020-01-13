package biolockj.module;

import java.util.HashMap;

public abstract class SuperModule {
	
	/**
	 * HashMap with property name as key and the description for this property as the value.
	 */
	protected HashMap<String, String> propDescMap = null;
	protected void fillPropDescMap() {
		propDescMap = new HashMap<>();
	}
		
	/**
	 * HashMap with property name as key and the description for this property as the value.
	 */
	protected HashMap<String, String> propTypeMap;
	protected void fillPropTypeMap() {
		propTypeMap = new HashMap<>();
	}
	
	protected Boolean validateProp( String property ) throws Exception {
		return null;
	}

}
