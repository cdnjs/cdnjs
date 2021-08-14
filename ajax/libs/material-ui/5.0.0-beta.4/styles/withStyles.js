import { formatMuiErrorMessage as _formatMuiErrorMessage } from "@material-ui/utils";
export default function withStyles() {
  throw new Error(process.env.NODE_ENV !== "production" ? `Material-UI: withStyles is not longer exported from @material-ui/core/styles.
You have to import it from @material-ui/styles.
See https://material-ui.com/r/migration-v4/#material-ui-core-styles for more details.` : _formatMuiErrorMessage(15));
}