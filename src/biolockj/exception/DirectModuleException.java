package biolockj.exception;

/**
 * Some module are run as secondary instances of the BioLockJ program.
 * There are run as script modules and the main program checks for flags in the modules directory.
 * If an exception is thrown, and the secondary instance of BioLockJ invokes the FatalExceptionHandler,
 * then the main program will throw this exception when it resumes.
 * This exception class is a cue to the FatalExceptionHandler, that some of its work may already be done.
 * @author ieclabau
 *
 */
public class DirectModuleException extends BioLockJException {

	public DirectModuleException( String msg ) {
		super( msg );
	}
	
	public DirectModuleException( ) {
		super( "An error occurred during the execution of a direct module." );
	}
	
	private static final long serialVersionUID = 6927852512694273571L;

}
