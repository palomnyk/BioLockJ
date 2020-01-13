package biolockj.exception;

/**
 * This type of exception is thrown if an error occurs while processing a special type of property such as "exe."
 * properties or defaultProps.
 * 
 * @author ieclabau
 *
 */
public class SpecialPropertiesException extends ConfigException {

	public SpecialPropertiesException( String msg ) {
		super( msg );
	}
	
	public SpecialPropertiesException( final String property, final String msg ) {
		super( property, "An Error was encountered while handling a special property." + RETURN + msg );
	}
	
	public SpecialPropertiesException( final String property, final BioLockJException bljEx ) {
		super( property, "An Error was encountered while handling a special property." + RETURN + bljEx.getMessage() );
		initCause( bljEx );
	}

	private static final long serialVersionUID = -7076943546805784829L;

}
