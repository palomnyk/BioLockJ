package biolockj.exception;

import biolockj.Log;

public class DockerVolCreationException extends DockerVolumeException {

	public DockerVolCreationException( String msg ) {
		super( msg );
	}
	
	public DockerVolCreationException( ) {
		super( "An error occurred when attempting to create the docker volume map." );
	}
	
	public DockerVolCreationException(Exception ex ) {
		super( "An error occurred when attempting to create the docker volume map." );
		Log.debug(this.getClass(), "The following error occurred when attempting to create the volume map:");
		Log.debug(this.getClass(), ex.getClass().getSimpleName() );
		Log.debug(this.getClass(), ex.getStackTrace().toString() );
	}
	
	private static final long serialVersionUID = -8548087131239616854L;

}
