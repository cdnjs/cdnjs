type BulkApiArgs = {
  type?: string;
  body: Object;
};
type DeleteApiArgs = {
  type?: string;
  id: string | number;
};
type GetApiArgs = DeleteApiArgs;
type AppbaseSettings = {
  recordAnalytics?: boolean;
  enableQueryRules?: boolean;
  userId?: string;
  customEvents?: Object;
};
type IndexApiArgs = {
  type?: string;
  id?: string;
  body: Object;
};
type MsearchApiArgs = BulkApiArgs;
type SearchApiArgs = BulkApiArgs;
type UpdateApiArgs = {
  type?: string;
  id: string | number;
  body: Object;
};
type FetchApiArgs = {
  method: string;
  path: string;
  body: Object | Array<Object>;
  params?: Object;
  isSuggestionsAPI?: Boolean;
};

/* eslint-disable */
interface AppbaseConfig {
  url?: string;
  app?: string;
  credentials?: string;
  username?: string;
  password?: string;
  enableTelemetry?: boolean;
}

interface AppbaseInstanceObject {
  performFetchRequest: (args: FetchApiArgs) => Object;
  index: (args: IndexApiArgs) => Object;
  get: (args: GetApiArgs) => Object;
  update: (args: UpdateApiArgs) => Object;
  delete: (args: DeleteApiArgs) => Object;
  bulk: (args: BulkApiArgs) => Object;
  search: (args: SearchApiArgs) => Object;
  msearch: (args: MsearchApiArgs) => Object;
  reactiveSearchv3: (
    query: Array<Object>,
    settings?: AppbaseSettings
  ) => Object;
  getQuerySuggestions: (
    query: Array<Object>,
    settings?: AppbaseSettings
  ) => Object;
  getMappings: () => Object;
  setHeaders: (headers?: Object, shouldEncode?: Boolean) => void;
}

/* eslint-enable */
declare function appbasejs(config: AppbaseConfig): AppbaseInstanceObject;
export default appbasejs;
