<script>
import { renderContentfulPost } from '../helpers/contentful/contentfulNodeRenderer';

export default {
  name: 'ContentfulRichTextRenderer',

  props: {
    body: {
      type: Object,
      required: true,
    },
    addSpacing: {
      type: Boolean,
      default: true,
    }
  },

  render: function(createElement) {
    return renderContentfulPost(this.body, createElement, this.addSpacing);
  }
}
</script>