/**
 * BLOCK: canadahelps-embed
 *
 * Registering a basic block with Gutenberg.
 * Simple block, renders and saves the same content without any interactivity.
 */

//  Import CSS.
import './style.scss';
import './editor.scss';

const { __ } = wp.i18n; // Import __() from wp.i18n
const { registerBlockType } = wp.blocks; // Import registerBlockType() from wp.blocks
const { PlainText } = wp.editor;

/**
 * Register: aa Gutenberg Block.
 *
 * Registers a new block provided a unique name and an object defining its
 * behavior. Once registered, the block is made editor as an option to any
 * editor interface where blocks are implemented.
 *
 * @link https://wordpress.org/gutenberg/handbook/block-api/
 * @param  {string}   name     Block name.
 * @param  {Object}   settings Block settings.
 * @return {?WPBlock}          The block, if it has been successfully
 *                             registered; otherwise `undefined`.
 */
registerBlockType( 'cgb/canadahelps-embed', {
	// Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
	title: __( 'Embed CanadaHelps Page' ), // Block title.
	icon: 'editor-table', // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
	category: 'widgets', // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
	keywords: [
		__( 'canadahelps' ),
		__( 'create-guten-block' ),
	],

  attributes: {
    form_id: {
      type: 'string',
      default: ''
    }
  },

  supports: {
    customClassName: false,
    html: false,
    multiple: false,
    reusable: false,
  },

	/**
	 * The edit function describes the structure of your block in the context of the editor.
	 * This represents what the editor will render when the block is used.
	 *
	 * The "edit" property must be a valid function.
	 *
	 * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
	 */
	edit: function({ attributes, className, setAttributes }) {

    const { form_id } = attributes;
		return (
      <div className={className}>
        <h2 className="canadahelps-header">CanadaHelps Embed</h2>
        <PlainText className="canadahelps-id" style={{height: 'auto'}} value={form_id} placeholder="Form ID #" onChange={ (newID) => setAttributes({form_id: parseInt(newID)})} />
      </div>
		);
	},

	/**
	 * The save function defines the way in which the different attributes should be combined
	 * into the final markup, which is then serialized by Gutenberg into post_content.
	 *
	 * The "save" property must be specified and must be a valid function.
	 *
	 * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
	 */
	save: function({ attributes }) {

    const { form_id } = attributes;

		return (
			<script
        id="ch_cdn_embed"
        type="text/javascript"
        data-page-id={form_id}
        data-cfasync="false"
        data-formtype="0"
        src="https://www.canadahelps.org/services/wa/js/apps/donatenow/embed.min.js">
      </script>
		);
	},
} );
