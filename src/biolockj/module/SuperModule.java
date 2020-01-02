package biolockj.module;

import java.util.HashMap;
import biolockj.Properties;

public abstract class SuperModule {
	
	protected HashMap<String, String> getPropDescMap() {
		return new HashMap<String, String>();
	}
	
	protected HashMap<String, String> getPropTypeMap() {
		return Properties.getPropTypeMap();
	}
	
	protected Boolean validateProp( String property ) throws Exception {
		return null;
	}

}
