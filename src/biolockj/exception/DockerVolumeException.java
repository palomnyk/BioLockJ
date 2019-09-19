package biolockj.exception;

import java.util.TreeMap;
import biolockj.Log;
import biolockj.util.DockerUtil;

public class DockerVolumeException extends BioLockJException {

	public DockerVolumeException( String msg ) {
		super( msg );
		TreeMap<String, String> map = DockerUtil.backdoorGetVolumeMap();
		if ( map != null ) {
			Log.debug(this.getClass(), "The volume map was defined with the following values (host: container):");
			showMap(map);
		}else {
			Log.debug(this.getClass(), "The volume map has not been defined.");
		}
	}
	
	protected void showMap(TreeMap<String, String> map) {
		for ( String key : map.keySet() ) {
			Log.debug(this.getClass(), key + ": " + map.get( key ) );
		}
	}
	
	private static final long serialVersionUID = 3363059602134756871L;

}
