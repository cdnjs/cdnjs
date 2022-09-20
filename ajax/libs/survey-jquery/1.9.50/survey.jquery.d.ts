/*
* Type definition for Survey JavaScript library for jQuery v1.9.50
* Copyright (c) 2015-2022 Devsoft Baltic OÜ  - https://surveyjs.io/
* License: MIT (http://www.opensource.org/licenses/mit-license.php)
*/
export { Survey as Model };
export { innerKo as ko };

export enum DragTypeOverMeEnum {
  InsideEmptyPanel = 1,
  MultilineRight,
  MultilineLeft
}
export interface HashTable<T = any> {
}
export interface ILocalizableOwner {
  getLocale(): string;
  getMarkdownHtml(text: string, name: string): string;
  getProcessedText(text: string): string;
  getRenderer(name: string): string;
  getRendererContext(locStr: LocalizableString): any;
}
export interface ILocalizableString {
  getLocaleText(loc: string): string;
  setLocaleText(loc: string, newValue: string): any;
  getJson(): any;
  getLocales(): Array<any>;
  getIsMultiple(): boolean;
}
export interface IPropertyDecoratorOptions<T = any> {
  defaultValue?: T;
  defaultSource?: string;
  getDefaultValue?: (objectInstance?: any) => T;
  localizable?: any;
  onSet?: (val: T, objectInstance: any) => void;
}
export interface IArrayPropertyDecoratorOptions {
  onPush?: any;
  onRemove?: any;
  onSet?: (val: any, target: any) => void;
}
export interface IObject {
}
export interface IFilePosition {
  offset: number;
  line: number;
  column: number;
}
export interface IFileRange {
  start: IFilePosition;
  end: IFilePosition;
}
export interface ILiteralExpectation {
  type: any;
  text: string;
  ignoreCase: boolean;
}
export interface IClassParts extends Array<any> {
}
export interface IClassExpectation {
  type: any;
  parts: IClassParts;
  inverted: boolean;
  ignoreCase: boolean;
}
export interface IAnyExpectation {
  type: any;
}
export interface IEndExpectation {
  type: any;
}
export interface IOtherExpectation {
  type: any;
  description: string;
}
export interface ICached {
  nextPos: number;
  result: any;
}
export interface IParseOptions {
  filename?: string;
  startRule?: string;
  tracer?: any;
}
/*
* Base interface for expression execution
*/
export interface IExpresionExecutor {
  /*
  * This call back runs on executing expression if there is at least one async function
  */
  onComplete: (res: any) => void;
}
export interface IAttachKey2clickOptions {
  processEsc?: boolean;
  disableTabStop?: boolean;
}
export interface IListModel {
  items: any;
  onSelectionChanged: (item: Action, ...params: any) => void;
  allowSelection?: boolean;
  selectedItem?: IAction;
  onFilterStringChangedCallback?: (text: string) => void;
}
export interface IPosition {
  left?: string | number;
  top?: string | number;
}
export interface INumberPosition extends IPosition {
  left?: number;
  top?: number;
}
export interface ISize {
  width: number;
  height: number;
}
export interface IPopupOptionsBase {
  onHide?: any;
  onShow?: any;
  onApply?: any;
  onCancel?: any;
  cssClass?: string;
  title?: string;
  verticalPosition?: any;
  horizontalPosition?: any;
  showPointer?: boolean;
  isModal?: boolean;
  displayMode?: "popup" | "overlay";
}
export interface IDialogOptions extends IPopupOptionsBase {
  componentName: string;
  data: any;
  onApply: any;
}
export interface IPopupModel<T = any> extends IDialogOptions {
  contentComponentName: string;
  contentComponentData: T;
}
/*
* An action item.
* Action items are used in the Toolbar, matrix rows, titles of pages, panels, questions, and other survey elements.
*/
export interface IAction {
  /*
  * A unique action item identifier.
  */
  id: string;
  /*
  * Specifies the action item's visibility.
  */
  visible?: boolean;
  /*
  * The action item's title.
  */
  title?: string;
  locTitle?: any;
  locTitleName?: string;
  /*
  * The action item's tooltip.
  */
  tooltip?: string;
  locTooltipName?: string;
  /*
  * Specifies whether users can interact with the action item.
  */
  enabled?: boolean;
  /*
  * Specifies the visibility of the action item's title.
  */
  showTitle?: boolean;
  /*
  * A function that is executed when users click the action item.
  */
  action?: (context?: any) => void;
  /*
  * One or several CSS classes that you want to apply to the outer `<div>` element.
  * In the markup, an action item is rendered as an `<input>` wrapped in a `<div>`. The `css` property applies classes to the `<div>`.
  * To apply several classes, separate them with a space character: "myclass1 myclass2".
  */
  css?: string;
  /*
  * One or several CSS classes that you want to apply to the inner `<input>` element.
  * In the markup, an action item is rendered as an `<input>` wrapped in a `<div>`. The `innerCss` property applies classes to the `<input>`.
  * To apply several classes, separate them with a space character: "myclass1 myclass2".
  */
  innerCss?: string;
  /*
  * The action item's data object. Use it to pass required data to a custom template or component.
  */
  data?: any;
  popupModel?: any;
  needSeparator?: boolean;
  /*
  * Specifies whether the action item is active.
  * Use it as a flag to specify different action item appearances in different states.
  */
  active?: boolean;
  pressed?: boolean;
  /*
  * Specifies the name of a template used to render the action item.
  */
  template?: string;
  /*
  * Specifies the name of a component used to render the action item.
  */
  component?: string;
  /*
  * The action item's icon name.
  */
  iconName?: string;
  /*
  * The action item's icon size in pixels.
  */
  iconSize?: number;
  /*
  * The action item's location in a matrix question's row.
  * 
  * The following values are available:
  * 
  * - `"start"` - The action item is located at the beginning of the row.
  * - `"end"` - The action is located at the end of the row.
  */
  location?: string;
  /*
  * Set this property to `true` if you want to disable keyboard navigation for the action item (sets the `tabIndex` attribute to -1).
  */
  disableTabStop?: boolean;
  /*
  * Set this property to `true` if you want the item's `title` to be always visible.
  * If you set it to `false`, the `title` hides when the screen space is limited, and the item displays only the icon.
  */
  disableShrink?: boolean;
  disableHide?: boolean;
  mode?: any;
  visibleIndex?: number;
  needSpace?: boolean;
}
export interface IActionDropdownPopupOptions extends IListModel, IPopupOptionsBase {
}
export interface IDimensions {
  scroll: number;
  offset: number;
}
export interface ISurveyTriggerOwner {
  getObjects(pages: any, questions: any): Array<any>;
  setCompleted(): void;
  canBeCompleted(): void;
  triggerExecuted(trigger: Trigger): void;
  setTriggerValue(name: string, value: any, isVariable: boolean): any;
  copyTriggerValue(name: string, fromName: string): any;
  focusQuestion(name: string): boolean;
}
export interface ISurveyTimerText {
  timerInfoText: string;
}
export interface IConditionObject {
  name: string;
  text: string;
  question: Question;
  context?: Question;
}
export interface IMatrixColumnOwner extends ILocalizableOwner {
  getRequiredText(): string;
  hasChoices(): boolean;
  onColumnPropertyChanged(column: MatrixDropdownColumn, name: string, newValue: any): void;
  onColumnItemValuePropertyChanged(column: MatrixDropdownColumn, propertyName: string, obj: ItemValue, name: string, newValue: any, oldValue: any): void;
  onShowInMultipleColumnsChanged(column: MatrixDropdownColumn): void;
  getCellType(): string;
  getCustomCellType(column: MatrixDropdownColumn, row: MatrixDropdownRowModelBase, cellType: string): string;
  onColumnCellTypeChanged(column: MatrixDropdownColumn): void;
}
export interface IMatrixDropdownData {
  value: any;
  onRowChanged(row: MatrixDropdownRowModelBase, columnName: string, newRowValue: any, isDeletingValue: boolean): void;
  onRowChanging(row: MatrixDropdownRowModelBase, columnName: string, rowValue: any): any;
  isValidateOnValueChanging: boolean;
  getRowIndex(row: MatrixDropdownRowModelBase): number;
  getRowValue(rowIndex: number): any;
  checkIfValueInRowDuplicated(checkedRow: MatrixDropdownRowModelBase, cellQuestion: Question): boolean;
  hasDetailPanel(row: MatrixDropdownRowModelBase): boolean;
  getIsDetailPanelShowing(row: MatrixDropdownRowModelBase): boolean;
  setIsDetailPanelShowing(row: MatrixDropdownRowModelBase, val: boolean): void;
  createRowDetailPanel(row: MatrixDropdownRowModelBase): PanelModel;
  validateCell(row: MatrixDropdownRowModelBase, columnName: string, rowValue: any): SurveyError;
  columns: any;
  createQuestion(row: MatrixDropdownRowModelBase, column: MatrixDropdownColumn): Question;
  getLocale(): string;
  getMarkdownHtml(text: string, name: string): string;
  getRenderer(name: string): string;
  getRendererContext(locStr: LocalizableString): any;
  getProcessedText(text: string): string;
  getParentTextProcessor(): ITextProcessor;
  getSharedQuestionByName(columnName: string, row: MatrixDropdownRowModelBase): Question;
  onTotalValueChanged(): any;
  getSurvey(): ISurvey;
}
export interface ISurveyData {
  getValue(name: string): any;
  setValue(name: string, newValue: any, locNotification: any, allowNotifyValueChanged?: boolean): any;
  getVariable(name: string): any;
  setVariable(name: string, newValue: any): void;
  getComment(name: string): string;
  setComment(name: string, newValue: string, locNotification: any): any;
  getAllValues(): any;
  getFilteredValues(): any;
  getFilteredProperties(): any;
}
export interface ITextProcessor {
  processText(text: string, returnDisplayValue: boolean): string;
  processTextEx(text: string, returnDisplayValue: boolean, doEncoding: boolean): any;
}
export interface ISurveyErrorOwner extends ILocalizableOwner {
  getErrorCustomText(text: string, error: SurveyError): string;
}
export interface ISurvey extends ITextProcessor, ISurveyErrorOwner {
  getSkeletonComponentName(element: ISurveyElement): string;
  currentPage: IPage;
  pages: any;
  getCss(): any;
  isPageStarted(page: IPage): boolean;
  getQuestionByName(name: string): IQuestion;
  pageVisibilityChanged(page: IPage, newValue: boolean): any;
  panelVisibilityChanged(panel: IPanel, newValue: boolean): any;
  questionVisibilityChanged(question: IQuestion, newValue: boolean): any;
  isEditingSurveyElement: boolean;
  isClearValueOnHidden: boolean;
  isClearValueOnHiddenContainer: boolean;
  questionsOrder: string;
  questionCreated(question: IQuestion): any;
  questionAdded(question: IQuestion, index: number, parentPanel: any, rootPanel: any): any;
  panelAdded(panel: IElement, index: number, parentPanel: any, rootPanel: any): any;
  questionRemoved(question: IQuestion): any;
  panelRemoved(panel: IElement): any;
  questionRenamed(question: IQuestion, oldName: string, oldValueName: string): any;
  validateQuestion(question: IQuestion): SurveyError;
  validatePanel(panel: IPanel): SurveyError;
  hasVisibleQuestionByValueName(valueName: string): boolean;
  questionCountByValueName(valueName: string): number;
  processHtml(html: string): string;
  getSurveyMarkdownHtml(element: Base, text: string, name: string): string;
  getRendererForString(element: Base, name: string): string;
  getRendererContextForString(element: Base, locStr: LocalizableString): any;
  getExpressionDisplayValue(question: IQuestion, value: any, displayValue: string): string;
  isDisplayMode: boolean;
  isDesignMode: boolean;
  areInvisibleElementsShowing: boolean;
  areEmptyElementsHidden: boolean;
  isLoadingFromJson: boolean;
  isUpdateValueTextOnTyping: boolean;
  autoGrowComment: boolean;
  state: string;
  isLazyRendering: boolean;
  cancelPreviewByPage(panel: IPanel): any;
  editText: string;
  cssNavigationEdit: string;
  requiredText: string;
  beforeSettingQuestionErrors(question: IQuestion, errors: any): void;
  beforeSettingPanelErrors(question: IPanel, errors: any): void;
  getSurveyErrorCustomText(obj: Base, text: string, error: SurveyError): string;
  getElementTitleTagName(element: Base, tagName: string): string;
  questionTitlePattern: string;
  getUpdatedQuestionTitle(question: IQuestion, title: string): string;
  getUpdatedQuestionNo(question: IQuestion, no: string): string;
  getUpdatedElementTitleActions(element: ISurveyElement, titleActions: any): Array<IAction>;
  getUpdatedMatrixRowActions(question: QuestionMatrixDropdownModelBase, row: MatrixDropdownRowModelBase, actions: any): Array<IAction>;
  questionStartIndex: string;
  questionTitleLocation: string;
  questionDescriptionLocation: string;
  questionErrorLocation: string;
  storeOthersAsComment: boolean;
  maxTextLength: number;
  maxOthersLength: number;
  clearValueOnDisableItems: boolean;
  uploadFiles(question: IQuestion, name: string, files: any, uploadingCallback: (status: string, data: any) => any): any;
  downloadFile(question: IQuestion, name: string, content: string, callback: (status: string, data: any) => any): any;
  clearFiles(question: IQuestion, name: string, value: any, fileName: string, clearCallback: (status: string, data: any) => any): any;
  updateChoicesFromServer(question: IQuestion, choices: any, serverResult: any): Array<any>;
  loadedChoicesFromServer(question: IQuestion): void;
  updateQuestionCssClasses(question: IQuestion, cssClasses: any): any;
  updatePanelCssClasses(panel: IPanel, cssClasses: any): any;
  updatePageCssClasses(panel: IPanel, cssClasses: any): any;
  updateChoiceItemCss(question: IQuestion, options: any): any;
  afterRenderQuestion(question: IQuestion, htmlElement: any): any;
  afterRenderQuestionInput(question: IQuestion, htmlElement: any): any;
  afterRenderPanel(panel: IElement, htmlElement: any): any;
  afterRenderPage(htmlElement: any): any;
  getQuestionByValueNameFromArray(valueName: string, name: string, index: number): IQuestion;
  canChangeChoiceItemsVisibility(): boolean;
  getChoiceItemVisibility(question: IQuestion, item: any, val: boolean): boolean;
  matrixRowAdded(question: IQuestion, row: any): any;
  matrixBeforeRowAdded(options: any): any;
  matrixRowRemoved(question: IQuestion, rowIndex: number, row: any): any;
  matrixRowRemoving(question: IQuestion, rowIndex: number, row: any): boolean;
  matrixAllowRemoveRow(question: IQuestion, rowIndex: number, row: any): boolean;
  matrixCellCreating(question: IQuestion, options: any): any;
  matrixCellCreated(question: IQuestion, options: any): any;
  matrixAfterCellRender(question: IQuestion, options: any): any;
  matrixCellValueChanged(question: IQuestion, options: any): any;
  matrixCellValueChanging(question: IQuestion, options: any): any;
  isValidateOnValueChanging: boolean;
  isValidateOnValueChanged: boolean;
  matrixCellValidate(question: IQuestion, options: any): SurveyError;
  dynamicPanelAdded(question: IQuestion, panelIndex?: number, panel?: IPanel): void;
  dynamicPanelRemoved(question: IQuestion, panelIndex: number, panel: IPanel): void;
  dynamicPanelRemoving(question: IQuestion, panelIndex: number, panel: IPanel): boolean;
  dynamicPanelItemValueChanged(question: IQuestion, options: any): any;
  dragAndDropAllow(options: any): boolean;
  scrollElementToTop(element: ISurveyElement, question: IQuestion, page: IPage, id: string): any;
  runExpression(expression: string): any;
  elementContentVisibilityChanged(element: ISurveyElement): void;
}
export interface ISurveyImpl {
  getSurveyData(): ISurveyData;
  getSurvey(): ISurvey;
  getTextProcessor(): ITextProcessor;
}
export interface IConditionRunner {
  runCondition(values: any, properties: any): any;
}
export interface IShortcutText {
  shortcutText: string;
}
export interface ISurveyElement extends IShortcutText {
  name: string;
  isVisible: boolean;
  isReadOnly: boolean;
  isPage: boolean;
  isPanel: boolean;
  containsErrors: boolean;
  parent: IPanel;
  skeletonComponentName: string;
  setSurveyImpl(value: ISurveyImpl, isLight?: boolean): any;
  onSurveyLoad(): any;
  onFirstRendering(): any;
  getType(): string;
  setVisibleIndex(value: number): number;
  locStrsChanged(): any;
  delete(): any;
  toggleState(): void;
  stateChangedCallback(): void;
  getTitleToolbar(): AdaptiveActionContainer;
}
export interface IElement extends IConditionRunner, ISurveyElement {
  visible: boolean;
  renderWidth: string;
  width: string;
  minWidth?: string;
  maxWidth?: string;
  isExpanded: boolean;
  isCollapsed: boolean;
  rightIndent: number;
  startWithNewLine: boolean;
  registerFunctionOnPropertyValueChanged(name: string, func: any, key: string): void;
  unRegisterFunctionOnPropertyValueChanged(name: string, key: string): void;
  getPanel(): IPanel;
  getLayoutType(): string;
  isLayoutTypeSupported(layoutType: string): boolean;
  removeElement(el: IElement): boolean;
  onAnyValueChanged(name: string): any;
  updateCustomWidgets(): any;
  clearIncorrectValues(): any;
  clearErrors(): any;
  dispose(): void;
  needResponsiveWidth(): boolean;
}
export interface IQuestion extends IElement, ISurveyErrorOwner {
  hasTitle: boolean;
  isEmpty(): boolean;
  onSurveyValueChanged(newValue: any): any;
  updateValueFromSurvey(newValue: any): any;
  updateCommentFromSurvey(newValue: any): any;
  supportGoNextPageAutomatic(): boolean;
  clearUnusedValues(): any;
  getDisplayValue(keysAsText: boolean, value: any): any;
  getValueName(): string;
  clearValue(): any;
  clearValueIfInvisible(): any;
  isAnswerCorrect(): boolean;
  updateValueWithDefaults(): any;
  getQuestionFromArray(name: string, index: number): IQuestion;
  value: any;
  survey: any;
}
export interface IParentElement {
  addElement(element: IElement, index: number): any;
  removeElement(element: IElement): boolean;
  isReadOnly: boolean;
}
export interface IPanel extends ISurveyElement, IParentElement {
  getChildrenLayoutType(): string;
  getQuestionTitleLocation(): string;
  getQuestionStartIndex(): string;
  parent: IPanel;
  elementWidthChanged(el: IElement): any;
  indexOf(el: IElement): number;
  elements: any;
  ensureRowsVisibility(): void;
}
export interface IPage extends IPanel, IConditionRunner {
  isStarted: boolean;
}
export interface ITitleOwner {
  name: string;
  no: string;
  requiredText: string;
  isRequireTextOnStart: boolean;
  isRequireTextBeforeTitle: boolean;
  isRequireTextAfterTitle: boolean;
  locTitle: LocalizableString;
}
export interface IProgressInfo {
  questionCount: number;
  answeredQuestionCount: number;
  requiredQuestionCount: number;
  requiredAnsweredQuestionCount: number;
}
export interface IWrapperObject {
  getOriginalObj(): Base;
  getClassNameProperty(): string;
}
export interface IFindElement {
  element: Base;
  str: LocalizableString;
}
export interface IExpressionRunnerInfo {
  onExecute: (obj: Base, res: any) => void;
  canRun?: (obj: Base) => boolean;
  runner?: ExpressionRunner;
}
export interface IValidatorOwner {
  getValidators(): Array<SurveyValidator>;
  validatedValue: any;
  getValidatorTitle(): string;
  getDataFilteredValues(): any;
  getDataFilteredProperties(): any;
}
export interface IMatrixData {
  onMatrixRowChanged(row: MatrixRowModel): void;
  getCorrectedRowValue(value: any): any;
}
export interface IMatrixCellsOwner extends ILocalizableOwner {
  getRows(): Array<any>;
  getColumns(): Array<any>;
}
export interface IMultipleTextData extends ILocalizableOwner, IPanel {
  getSurvey(): ISurvey;
  getTextProcessor(): ITextProcessor;
  getAllValues(): any;
  getMultipleTextValue(name: string): any;
  setMultipleTextValue(name: string, value: any): any;
  getItemDefaultValue(name: string): any;
  getIsRequiredText(): string;
}
export interface SurveyTemplateRendererTemplateData {
  name: string;
  data: any;
  nodes?: any;
  afterRender: (el: any, context: any) => void;
}
export interface SurveyTemplateRendererViewModel {
  componentData: any;
  templateData: SurveyTemplateRendererTemplateData;
}
export interface IQuestionPanelDynamicData {
  getItemIndex(item: ISurveyData): number;
  getPanelItemData(item: ISurveyData): any;
  setPanelItemData(item: ISurveyData, name: string, val: any): any;
  getSharedQuestionFromArray(name: string, panelIndex: number): Question;
  getSurvey(): ISurvey;
  getRootData(): ISurveyData;
}
/*
* An interface used to create custom question types.
* 
* Refer to the following articles for more information:
* 
* - [Create Specialized Question Types](https://surveyjs.io/Documentation/Survey-Creator?id=create-specialized-question-types)
* - [Create Composite Question Types](https://surveyjs.io/Documentation/Survey-Creator?id=create-composite-question-types)
*/
export interface ICustomQuestionTypeConfiguration {
  /*
  * A name used to identify a custom question type.
  */
  name: string;
  /*
  * A title used for this custom question type in the UI. When `title` is not specified, the `name` property value is used.
  */
  title?: string;
  /*
  * An icon for the custom question type.
  */
  icon?: string;
  /*
  * A function that is called when the custom question type is initialized. Use it to add, remove, or modify the type's properties (see [Override Base Question Properties](https://surveyjs.io/Documentation/Survey-Creator?id=create-composite-question-types#override-base-question-properties)).
  */
  onInit(): void;
  /*
  * Specifies whether the custom question type is available in the Toolbox and the Add Question menu.
  * 
  * Default value: `true`
  * 
  * Set this property to `false` if your custom question type is used only to customize Property Grid content and is not meant for a survey.
  */
  showInToolbox?: boolean;
  /*
  * A function that is called when the custom question is created. Use it to access questions nested within a [composite question type](https://surveyjs.io/Documentation/Survey-Creator?id=create-composite-question-types).
  * 
  * Parameters:
  * 
  * - `question`: [Question](https://surveyjs.io/Documentation/Library?id=Question) - The custom question.
  */
  onCreated(question: Question): void;
  /*
  * A function that is called when JSON schemas are loaded.
  * 
  * Parameters:
  * 
  * - `question`: [Question](https://surveyjs.io/Documentation/Library?id=Question) - The custom question.
  */
  onLoaded(question: Question): void;
  /*
  * A function that is called after the entire question is rendered.
  * 
  * Parameters:
  * 
  * - `question`: [Question](https://surveyjs.io/Documentation/Library?id=Question) - The custom question.
  * - `htmlElement`: any - An HTML element that represents the custom question.
  */
  onAfterRender(question: Question, htmlElement: any): void;
  /*
  * A function that is called each time a question nested within a [composite question](https://surveyjs.io/Documentation/Survey-Creator?id=create-composite-question-types) is rendered.
  * 
  * Parameters:
  * 
  * - `question`: [Question](https://surveyjs.io/Documentation/Library?id=Question) - The composite question.
  * - `element`: [Question](https://surveyjs.io/Documentation/Library?id=Question) - A nested question.
  * - `htmlElement`: any - An HTML element that represents the nested question.
  */
  onAfterRenderContentElement(question: Question, element: Question, htmlElement: any): void;
  /*
  * A function that is called when a custom question type property is changed. Use it to handle property changes.
  * 
  * Parameters:
  * 
  * - `question`: [Question](https://surveyjs.io/Documentation/Library?id=Question) - The custom question.
  * - `propertyName`: string - The name of the changed property.
  * - `newValue`: any - A new value for the property.
  */
  onPropertyChanged(question: Question, propertyName: string, newValue: any): void;
  /*
  * A function that is called when the question value is changed.
  * 
  * Parameters:
  * 
  * - `question`: [Question](https://surveyjs.io/Documentation/Library?id=Question) - The custom question.
  * - `name`: string -  The question's [name](https://surveyjs.io/Documentation/Library?id=Question#name).
  * - `newValue`: any - A new value for the question.
  */
  onValueChanged(question: Question, name: string, newValue: any): void;
  /*
  * A function that is called when an [ItemValue](https://surveyjs.io/Documentation/Library?id=itemvalue) property is changed.
  * 
  * Parameters:
  * 
  * - `question`: [Question](https://surveyjs.io/Documentation/Library?id=Question) - The custom question.
  * - `options.obj`: [ItemValue](https://surveyjs.io/Documentation/Library?id=itemvalue) - An `ItemValue` object.
  * - `options.propertyName`: string - The name of the property to which an array of `ItemValue` objects is assigned (for example, `"choices"` or `"rows"`).
  * - `options.name`: string - The name of the changed property: `"text"` or `"value"`.
  * - `options.newValue`: any - A new value for the property.
  */
  onItemValuePropertyChanged(question: Question, options: any): void;
  /*
  * A function that allows you to override the default `getDisplayValue()` implementation.
  */
  getDisplayValue?: any;
  /*
  * JSON schemas of nested questions. Specify this property to create a [composite question type](https://surveyjs.io/Documentation/Survey-Creator?id=create-composite-question-types).
  */
  elementsJSON?: any;
  /*
  * A function that allows you to create nested questions if you do not specify the `elementsJSON` property.
  */
  createElements?: any;
  /*
  * A JSON schema for a built-in question type on which the custom question type is based.
  * 
  * Refer to the [Create Specialized Question Types](https://surveyjs.io/Documentation/Survey-Creator?id=create-specialized-question-types) help topic for more information.
  */
  questionJSON?: any;
  /*
  * A function that allows you to create a custom question if you do not specify the `questionJSON` property.
  */
  createQuestion?: any;
}
export declare class ActionDropdownViewModel {
  constructor(item: Action);
  popupModel: any;
  funcKey: string;
  dispose(): void;
}
export declare class ArrayChanges {
  constructor(index: number, deleteCount: number, itemsToAdd: any, deletedItems: any);
  index: number;
  deleteCount: number;
  itemsToAdd: any;
  deletedItems: any;
}
/*
* A base class for all SurveyJS objects.
*/
export declare class Base {
  constructor();
  static currentDependencis: Dependencies;
  static finishCollectDependencies(): Dependencies;
  static startCollectDependencies(updater: any, target: Base, property: string): void;
  static get commentPrefix(): string;
  static set commentPrefix(val: string);
  static createItemValue: (item: any, type?: string) => any;
  static itemValueLocStrChanged: (arr: any) => void;
  /*
  * Returns `true` if a passed `value` is an empty string, array, or object or if it equals to `undefined` or `null`.
  */
  isValueEmpty(value: any, trimString?: boolean): boolean;
  protected trimValue(value: any): any;
  protected isPropertyEmpty(value: any): boolean;
  propertyHash: any;
  localizableStrings: any;
  arraysInfo: any;
  eventList: any;
  expressionInfo: any;
  bindingsValue: Bindings;
  isDisposedValue: boolean;
  onPropChangeFunctions: any;
  protected isLoadingFromJsonValue: boolean;
  loadingOwner: Base;
  /*
  * An event that is raised when a property of this SurveyJS object has changed.
  * 
  * Parameters:
  * 
  * - `sender` - A SurveyJS object whose property has changed.
  * - `options.name` - The name of the changed property.
  * - `options.oldValue` - An old value of the property. If the property is an array, `oldValue` contains the same array as `newValue` does.
  * - `options.newValue` - A new value for the property.
  */
  onPropertyChanged: EventBase<Base>;
  /*
  * An event that is raised when an [ItemValue](https://surveyjs.io/form-library/documentation/itemvalue) property is changed.
  * 
  * Parameters:
  * 
  * - `sender` - A SurveyJS object whose property contains an array of `ItemValue` objects.
  * - `options.obj` - An `ItemValue` object.
  * - `options.propertyName` - The name of the property to which an array of `ItemValue` objects is assigned (for example, `"choices"` or `"rows"`).
  * - `options.name` - The name of the changed property: `"text"` or `"value"`.
  * - `options.newValue` - A new value for the property.
  */
  onItemValuePropertyChanged: Event<(sender: Base, options: any) => any, any>;
  getPropertyValueCoreHandler: (propertiesHash: any, name: string) => any;
  setPropertyValueCoreHandler: (propertiesHash: any, name: string, val: any) => void;
  createArrayCoreHandler: (propertiesHash: any, name: string) => any;
  surveyChangedCallback: any;
  isCreating: boolean;
  dispose(): void;
  get isDisposed(): boolean;
  protected addEvent<T>(): EventBase<T>;
  protected onBaseCreating(): void;
  /*
  * Returns the object type as it is used in the JSON schema.
  */
  getType(): string;
  /*
  * Use this method to find out if the current object is of a given `typeName` or inherited from it.
  */
  isDescendantOf(typeName: string): boolean;
  getSurvey(isLive?: boolean): ISurvey;
  /*
  * Returns `true` if the survey is being designed in Survey Creator.
  */
  get isDesignMode(): boolean;
  /*
  * Returns `true` if the object is included in a survey.
  * 
  * This method may return `false`, for example, when you [create a survey model dynamically](https://surveyjs.io/form-library/documentation/design-survey-create-a-simple-survey#create-or-change-a-survey-model-dynamically).
  */
  get inSurvey(): boolean;
  get bindings(): Bindings;
  checkBindings(valueName: string, value: any): void;
  protected updateBindings(propertyName: string, value: any): void;
  protected updateBindingValue(valueName: string, value: any): void;
  getTemplate(): string;
  /*
  * Returns `true` if the object configuration is being loaded from JSON.
  */
  get isLoadingFromJson(): boolean;
  protected getIsLoadingFromJson(): boolean;
  startLoadingFromJson(json?: any): void;
  endLoadingFromJson(): void;
  /*
  * Returns a JSON object that corresponds to the current SurveyJS object.
  */
  toJSON(): any;
  /*
  * Assigns a new configuration to the current SurveyJS object. This configuration is taken from a passed JSON object.
  * 
  * The JSON object should contain only serializable properties of this SurveyJS object. Event handlers and properties that do not belong to the SurveyJS object are ignored.
  */
  fromJSON(json: any): void;
  onSurveyLoad(): void;
  /*
  * Creates a new object that has the same type and properties as the current SurveyJS object.
  */
  clone(): Base;
  /*
  * Returns a `JsonObjectProperty` object with metadata about a serializable property that belongs to the current SurveyJS object.
  * 
  * If the property is not found, this method returns `null`.
  */
  getPropertyByName(propName: string): JsonObjectProperty;
  isPropertyVisible(propName: string): boolean;
  static createProgressInfo(): IProgressInfo;
  getProgressInfo(): IProgressInfo;
  localeChanged(): void;
  locStrsChanged(): void;
  /*
  * Returns the value of a property with a specified name.
  * 
  * If the property is not found or does not have a value, this method returns either `undefined`, `defaultValue` specified in the property configuration, or a value passed as the `defaultValue` parameter.
  */
  getPropertyValue(name: string, defaultValue?: any): any;
  protected getPropertyValueCore(propertiesHash: any, name: string): any;
  geValueFromHash(): any;
  protected setPropertyValueCore(propertiesHash: any, name: string, val: any): void;
  get isEditingSurveyElement(): boolean;
  iteratePropertiesHash(func: (hash: any, key: any) => void): void;
  /*
  * set property value and before check if new property value is correct by calling JsonProperty onSettingValue function
  * If onSettingValue is not set in declaration, then this function works as `setPropertyValue`.
  */
  checkAndSetPropertyValue(name: string, val: any): void;
  /*
  * Assigns a new value to a specified property.
  */
  setPropertyValue(name: string, val: any): void;
  protected setArrayPropertyDirectly(name: string, val: any, sendNotification?: boolean): void;
  protected setPropertyValueDirectly(name: string, val: any): void;
  protected clearPropertyValue(name: string): void;
  onPropertyValueChangedCallback(name: string, oldValue: any, newValue: any, sender: Base, arrayChanges: ArrayChanges): void;
  itemValuePropertyChanged(item: ItemValue, name: string, oldValue: any, newValue: any): void;
  protected onPropertyValueChanged(name: string, oldValue: any, newValue: any): void;
  protected propertyValueChanged(name: string, oldValue: any, newValue: any, arrayChanges?: ArrayChanges, target?: Base): void;
  onBindingChanged(oldValue: any, newValue: any): void;
  protected get isInternal(): boolean;
  addExpressionProperty(name: string, onExecute: (obj: Base, res: any) => void, canRun?: (obj: Base) => boolean): void;
  getDataFilteredValues(): any;
  getDataFilteredProperties(): any;
  protected runConditionCore(values: any, properties: any): void;
  protected canRunConditions(): boolean;
  /*
  * Register a function that will be called on a property value changed.
  */
  registerFunctionOnPropertyValueChanged(name: string, func: any, key?: string): void;
  /*
  * Register a function that will be called on a property value changed from the names list.
  */
  registerFunctionOnPropertiesValueChanged(names: any, func: any, key?: string): void;
  /*
  * Unregister notification on property value changed
  */
  unRegisterFunctionOnPropertyValueChanged(name: string, key?: string): void;
  /*
  * Unregister notification on property value changed for all properties in the names list.
  */
  unRegisterFunctionOnPropertiesValueChanged(names: any, key?: string): void;
  createCustomLocalizableObj(name: string): void;
  getLocale(): string;
  getLocalizationString(strName: string): string;
  getLocalizationFormatString(strName: string, args: any): string;
  protected createLocalizableString(name: string, owner: ILocalizableOwner, useMarkDown?: boolean, defaultStr?: string | boolean): LocalizableString;
  getLocalizableString(name: string): LocalizableString;
  getLocalizableStringText(name: string, defaultStr?: string): string;
  setLocalizableStringText(name: string, value: string): void;
  addUsedLocales(locales: any): void;
  searchText(text: string, founded: any): void;
  protected getSearchableLocKeys(keys: any): void;
  protected getSearchableItemValueKeys(keys: any): void;
  protected AddLocStringToUsedLocales(locStr: LocalizableString, locales: any): void;
  protected createItemValues(name: string): Array<any>;
  protected createNewArrayCore(name: string): Array<any>;
  protected ensureArray(name: string, onPush?: any, onRemove?: any): any;
  protected createNewArray(name: string, onPush?: any, onRemove?: any): Array<any>;
  protected getItemValueType(): string;
  protected setArray(name: string, src: any, dest: any, isItemValues: boolean, onPush: any): void;
  protected isTwoValueEquals(x: any, y: any, caseInSensitive?: boolean, trimString?: boolean): boolean;
  protected copyCssClasses(dest: any, source: any): void;
}
export declare class Bindings {
  constructor(obj: Base);
  properties: any;
  values: any;
  getType(): string;
  getNames(): Array<any>;
  getProperties(): Array<JsonObjectProperty>;
  setBinding(propertyName: string, valueName: string): void;
  clearBinding(propertyName: string): void;
  isEmpty(): boolean;
  getValueNameByPropertyName(propertyName: string): string;
  getPropertiesByValueName(valueName: string): Array<any>;
  getJson(): any;
  setJson(value: any): void;
}
export declare class ButtonGroupItemModel {
  constructor(question: QuestionButtonGroupModel, item: ItemValue, index: number);
  question: QuestionButtonGroupModel;
  item: ItemValue;
  index: number;
  get value(): any;
  get iconName(): any;
  get iconSize(): any;
  get caption(): LocalizableString;
  get showCaption(): any;
  get isRequired(): boolean;
  get selected(): boolean;
  get readOnly(): boolean;
  get name(): string;
  get id(): string;
  get hasErrors(): boolean;
  get describedBy(): string;
  get css(): any;
  onChange(): void;
}
export declare class ButtonGroupItemViewModel {
  constructor(model: any);
  model: any;
}
export declare class ComponentCollection {
  static Instance: ComponentCollection;
  customQuestionValues: any;
  onCreateComposite: (name: string, questionJSON: ComponentQuestionJSON) => QuestionCompositeModel;
  onCreateCustom: (name: string, questionJSON: ComponentQuestionJSON) => QuestionCustomModel;
  onAddingJson: (name: string, isComposite: boolean) => void;
  add(json: ICustomQuestionTypeConfiguration): void;
  get items(): any;
  getCustomQuestionByName(name: string): ComponentQuestionJSON;
  clear(): void;
  createQuestion(name: string, questionJSON: ComponentQuestionJSON): Question;
  protected createCompositeModel(name: string, questionJSON: ComponentQuestionJSON): QuestionCompositeModel;
  protected createCustomModel(name: string, questionJSON: ComponentQuestionJSON): QuestionCustomModel;
}
export declare class ComponentQuestionJSON {
  constructor(name: string, json: ICustomQuestionTypeConfiguration);
  name: string;
  json: ICustomQuestionTypeConfiguration;
  onInit(): void;
  onCreated(question: Question): void;
  onLoaded(question: Question): void;
  onAfterRender(question: Question, htmlElement: any): void;
  onAfterRenderContentElement(question: Question, element: Question, htmlElement: any): void;
  onPropertyChanged(question: Question, propertyName: string, newValue: any): void;
  onValueChanged(question: Question, name: string, newValue: any): void;
  onItemValuePropertyChanged(question: Question, item: ItemValue, propertyName: string, name: string, newValue: any): void;
  getDisplayValue(keyAsText: boolean, value: any, question: Question): any;
  get isComposite(): boolean;
}
export declare class ComputedUpdater<T = any> {
  constructor(_updater: any);
  static ComputedUpdaterType: any;
  dependencies: Dependencies;
  type: any;
  get updater(): any;
  setDependencies(dependencies: Dependencies): void;
  protected getDependencies(): Dependencies;
  dispose(): any;
}
export declare class ConditionsParser {
  conditionError: ConditionsParserError;
  static parserCache: any;
  createCondition(text: string): Operand;
  parseExpression(text: string): Operand;
  get error(): ConditionsParserError;
}
export declare class ConditionsParserError {
  constructor(at: number, code: string);
  at: number;
  code: string;
}
export declare class CssClassBuilder {
  classes: any;
  isEmpty(): boolean;
  append(value: string, condition?: boolean): CssClassBuilder;
  toString(): string;
}
export declare class CustomPropertiesCollection {
  static properties: IObject;
  static parentClasses: any;
  static addProperty(className: string, property: any): void;
  static removeProperty(className: string, propertyName: string): void;
  static removeAllProperties(className: string): void;
  static addClass(className: string, parentClassName: string): void;
  static getProperties(className: string): Array<any>;
  static createProperties(obj: any): void;
}
export declare class CustomWidgetCollection {
  static Instance: CustomWidgetCollection;
  widgetsValues: any;
  widgetsActivatedBy: any;
  onCustomWidgetAdded: Event<(customWidget: QuestionCustomWidget) => any, any>;
  get widgets(): any;
  add(widgetJson: any, activatedBy?: string): void;
  addCustomWidget(widgetJson: any, activatedBy?: string): QuestionCustomWidget;
  /*
  * Returns the way the custom wiget is activated. It can be activated by a property ("property"), question type ("type") or by new/custom question type ("customtype").
  */
  getActivatedBy(widgetName: string): string;
  /*
  * Sets the way the custom wiget is activated. The activation types are: property ("property"), question type ("type") or new/custom question type ("customtype"). A custom wiget may support all or only some of this activation types.
  */
  setActivatedBy(widgetName: string, activatedBy: string): void;
  clear(): void;
  getCustomWidgetByName(name: string): QuestionCustomWidget;
  getCustomWidget(question: IQuestion): QuestionCustomWidget;
}
export declare class DefaultTitleModel {
  static getIconCss(cssClasses: any, isCollapsed: boolean): string;
}
export declare class Dependencies {
  constructor(currentDependency: any, target: Base, property: string);
  currentDependency: any;
  target: Base;
  property: string;
  static DependenciesCount: number;
  dependencies: any;
  id: string;
  addDependency(target: Base, property: string): void;
  dispose(): void;
}
export declare class DragDropInfo {
  constructor(source: IElement, target: IElement, nestedPanelDepth?: number);
  source: IElement;
  target: IElement;
  nestedPanelDepth: number;
  destination: ISurveyElement;
  isBottom: boolean;
  isEdge: boolean;
}
export declare class DragOrClickHelper {
  constructor(dragHandler: any);
  pointerDownEvent: any;
  currentTarget: any;
  startX: any;
  startY: any;
  currentX: any;
  currentY: any;
  itemModel: any;
  onPointerDown(pointerDownEvent: any, itemModel?: any): void;
  onPointerUp: (pointerUpEvent: any) => void;
  tryToStartDrag: (pointerMoveEvent: any) => boolean;
}
export declare class ElementFactory {
  static Instance: ElementFactory;
  creatorHash: any;
  registerElement(elementType: string, elementCreator: (name: string) => IElement): void;
  clear(): void;
  unregisterElement(elementType: string, removeFromSerializer?: boolean): void;
  getAllTypes(): Array<any>;
  createElement(elementType: string, name: string): IElement;
}
export declare class ElementHelper {
}
export declare class Event<T, Options> {
  onCallbacksChanged: any;
  protected callbacks: any;
  get isEmpty(): boolean;
  get length(): number;
  fireByCreatingOptions(sender: any, createOptions: any): void;
  fire(sender: any, options: any): void;
  clear(): void;
  add(func: T): void;
  remove(func: T): void;
  hasFunc(func: T): boolean;
}
export declare class ExpressionRunnerBase {
  constructor(expression: string);
  expressionExecutor: IExpresionExecutor;
  get expression(): string;
  set expression(val: string);
  getVariables(): Array<any>;
  hasFunction(): boolean;
  get isAsync(): boolean;
  canRun(): boolean;
  protected runCore(values: any, properties?: any): any;
  protected doOnComplete(res: any): void;
}
export declare class FunctionFactory {
  static Instance: FunctionFactory;
  functionHash: any;
  isAsyncHash: any;
  register(name: string, func: (params: any) => any, isAsync?: boolean): void;
  unregister(name: string): void;
  hasFunction(name: string): boolean;
  isAsyncFunction(name: string): boolean;
  clear(): void;
  getAll(): Array<any>;
  run(name: string, params: any, properties?: any): any;
}
export declare class Helpers {
  /*
  * A static methods that returns true if a value undefined, null, empty string or empty array.
  */
  static isValueEmpty(value: any): boolean;
  static isArrayContainsEqual(x: any, y: any): boolean;
  static isArraysEqual(x: any, y: any, ignoreOrder?: boolean, caseSensitive?: boolean, trimStrings?: boolean): boolean;
  static isTwoValueEquals(x: any, y: any, ignoreOrder?: boolean, caseSensitive?: boolean, trimStrings?: boolean): boolean;
  static randomizeArray<T>(array: any): Array<T>;
  static getUnbindValue(value: any): any;
  static createCopy(obj: any): any;
  static isConvertibleToNumber(value: any): boolean;
  static isNumber(value: any): boolean;
  static getMaxLength(maxLength: number, surveyLength: number): any;
  static getNumberByIndex(index: number, startIndexStr: string): string;
  static isCharNotLetterAndDigit(ch: string): boolean;
  static isCharDigit(ch: string): boolean;
  static correctAfterPlusMinis(a: number, b: number, res: number): number;
  static correctAfterMultiple(a: number, b: number, res: number): number;
  static convertArrayValueToObject(src: any, propName: string, dest?: any): Array<any>;
  static convertArrayObjectToValue(src: any, propName: string): Array<any>;
}
export declare class ImplementorBase {
  constructor(element: any);
  element: any;
  implementedMark: any;
  dispose(): void;
}
export declare class JsonError {
  constructor(type: string, message: string);
  type: string;
  message: string;
  description: string;
  at: any;
  getFullDescription(): string;
}
/*
* The metadata object. It contains object properties' runtime information and allows you to modify it.
*/
export declare class JsonMetadata {
  classes: any;
  alternativeNames: any;
  childrenClasses: any;
  classProperties: any;
  classHashProperties: any;
  onSerializingProperty: (obj: Base, prop: JsonObjectProperty, value: any, json: any) => boolean;
  getObjPropertyValue(obj: any, name: string): any;
  setObjPropertyValue(obj: any, name: string, val: any): void;
  addClass(name: string, properties: any, creator?: (json?: any) => any, parentName?: string): JsonMetadataClass;
  removeClass(name: string): void;
  overrideClassCreatore(name: string, creator: any): void;
  overrideClassCreator(name: string, creator: any): void;
  getProperties(className: string): Array<JsonObjectProperty>;
  getPropertiesByObj(obj: any): Array<JsonObjectProperty>;
  getDynamicPropertiesByObj(obj: any, dynamicType?: string): Array<JsonObjectProperty>;
  hasOriginalProperty(obj: Base, propName: string): boolean;
  getOriginalProperty(obj: Base, propName: string): JsonObjectProperty;
  getProperty(className: string, propertyName: string): JsonObjectProperty;
  findProperty(className: string, propertyName: string): JsonObjectProperty;
  findProperties(className: string, propertyNames: any): Array<JsonObjectProperty>;
  getAllPropertiesByName(propertyName: string): Array<JsonObjectProperty>;
  getAllClasses(): Array<any>;
  createClass(name: string, json?: any): any;
  getChildrenClasses(name: string, canBeCreated?: boolean): Array<JsonMetadataClass>;
  getRequiredProperties(name: string): Array<any>;
  addProperties(className: string, propertiesInfos: any): void;
  addProperty(className: string, propertyInfo: any): JsonObjectProperty;
  removeProperty(className: string, propertyName: string): boolean;
  findClass(name: string): JsonMetadataClass;
  isDescendantOf(className: string, ancestorClassName: string): boolean;
  addAlterNativeClassName(name: string, alternativeName: string): void;
  generateSchema(className?: string): any;
}
export declare class JsonMetadataClass {
  constructor(name: string, properties: any, creator?: (json?: any) => any, parentName?: string);
  name: string;
  creator: (json?: any) => any;
  parentName: string;
  static requiredSymbol: string;
  static typeSymbol: string;
  properties: any;
  isCustomValue: boolean;
  find(name: string): JsonObjectProperty;
  get isCustom(): boolean;
  createProperty(propInfo: any, isCustom?: boolean): JsonObjectProperty;
}
export declare class JsonObject {
  static typePropertyName: string;
  static positionPropertyName: string;
  static metaDataValue: JsonMetadata;
  static get metaData(): JsonMetadata;
  errors: any;
  lightSerializing: boolean;
  toJsonObject(obj: any, storeDefaults?: boolean): any;
  toObject(jsonObj: any, obj: any): void;
  toObjectCore(jsonObj: any, obj: any): void;
  toJsonObjectCore(obj: any, property: JsonObjectProperty, storeDefaults?: boolean): any;
  valueToJson(obj: any, result: any, property: JsonObjectProperty, storeDefaults?: boolean): void;
  valueToObj(value: any, obj: any, property: JsonObjectProperty): void;
}
export declare class MatrixCells {
  constructor(cellsOwner: IMatrixCellsOwner);
  cellsOwner: IMatrixCellsOwner;
  values: any;
  get isEmpty(): boolean;
  onValuesChanged: any;
  setCellText(row: any, column: any, val: string): void;
  setDefaultCellText(column: any, val: string): void;
  getCellLocText(row: any, column: any): LocalizableString;
  getDefaultCellLocText(column: any, val: string): LocalizableString;
  getCellDisplayLocText(row: any, column: any): LocalizableString;
  getCellText(row: any, column: any): string;
  getDefaultCellText(column: any): string;
  getCellDisplayText(row: any, column: any): string;
  get rows(): any;
  get columns(): any;
  getJson(): any;
  setJson(value: any): void;
  protected createString(): LocalizableString;
}
export declare class MatrixDropdownCell {
  constructor(column: MatrixDropdownColumn, row: MatrixDropdownRowModelBase, data: IMatrixDropdownData);
  column: MatrixDropdownColumn;
  row: MatrixDropdownRowModelBase;
  data: IMatrixDropdownData;
  questionValue: Question;
  locStrsChanged(): void;
  protected createQuestion(column: MatrixDropdownColumn, row: MatrixDropdownRowModelBase, data: IMatrixDropdownData): Question;
  get question(): Question;
  get value(): any;
  set value(val: any);
  runCondition(values: any, properties: any): void;
}
export declare class Operand {
  toString(func?: (op: Operand) => string): string;
  getType(): string;
  evaluate(processValue?: ProcessValue): any;
  setVariables(variables: any): any;
  hasFunction(): boolean;
  hasAsyncFunction(): boolean;
  addToAsyncList(list: any): void;
  isEqual(op: Operand): boolean;
  protected isContentEqual(op: Operand): boolean;
  protected areOperatorsEquals(op1: Operand, op2: Operand): boolean;
}
export declare class OperandMaker {
  static unaryFunctions: any;
  static binaryFunctions: any;
  static signs: any;
}
export declare class PanelViewModel {
  constructor(question: any, targetElement: any);
  question: any;
  targetElement: any;
}
export declare class PopupUtils {
  static bottomIndent: number;
  static calculatePosition(targetRect: any, height: number, width: number, verticalPosition: any, horizontalPosition: any, showPointer: boolean, positionMode?: any): INumberPosition;
  static updateVerticalDimensions(top: number, height: number, windowHeight: number): any;
  static updateHorizontalDimensions(left: number, width: number, windowWidth: number, horizontalPosition: any, positionMode?: any, margins?: any): any;
  static updateVerticalPosition(targetRect: any, height: number, verticalPosition: any, showPointer: boolean, windowHeight: number): any;
  static calculatePopupDirection(verticalPosition: any, horizontalPosition: any): string;
  static calculatePointerTarget(targetRect: any, top: number, left: number, verticalPosition: any, horizontalPosition: any, marginLeft?: number, marginRight?: number): INumberPosition;
}
export declare class PopupViewModel {
  constructor(popupViewModel: any);
  popupViewModel: any;
  dispose(): void;
}
export declare class ProcessValue {
  constructor();
  values: any;
  properties: any;
  getFirstName(text: string, obj?: any): string;
  hasValue(text: string, values?: any): boolean;
  getValue(text: string, values?: any): any;
  setValue(obj: any, text: string, value: any): void;
  getValueInfo(valueInfo: any): void;
}
export declare class ProgressButtonsViewModel {
  constructor(survey: any, element: any);
  progressButtonsModel: any;
  scrollButtonCssKo: any;
  hasScroller: any;
  updateScroller: any;
  isListElementClickable(index: any): boolean;
  getListElementCss(index: any): string;
  clickListElement(index: any): void;
  getScrollButtonCss(isLeftScroll: boolean): any;
  clickScrollButton(listContainerElement: any, isLeftScroll: boolean): void;
  dispose(): void;
}
export declare class ProgressViewModel {
  constructor(model: any);
  model: any;
  getProgressTextInBarCss(css: any): string;
  getProgressTextUnderBarCss(css: any): string;
}
export declare class QuestionCustomWidget {
  constructor(name: string, widgetJson: any);
  name: string;
  widgetJson: any;
  htmlTemplate: string;
  afterRender(question: IQuestion, el: any): void;
  willUnmount(question: IQuestion, el: any): void;
  getDisplayValue(question: IQuestion, value?: any): string;
  isFit(question: IQuestion): boolean;
  get canShowInToolbox(): boolean;
  get showInToolbox(): boolean;
  set showInToolbox(val: boolean);
  init(): void;
  activatedByChanged(activatedBy: string): void;
  get isDefaultRender(): boolean;
  get pdfQuestionType(): string;
  get pdfRender(): any;
}
export declare class QuestionFactory {
  static Instance: QuestionFactory;
  static get DefaultChoices(): any;
  static get DefaultColums(): any;
  static get DefaultRows(): any;
  static get DefaultMutlipleTextItems(): any;
  creatorHash: any;
  registerQuestion(questionType: string, questionCreator: (name: string) => Question): void;
  unregisterElement(elementType: string): void;
  clear(): void;
  getAllTypes(): Array<any>;
  createQuestion(questionType: string, name: string): Question;
}
export declare class QuestionMatrixDropdownRenderedCell {
  constructor();
  static counter: number;
  idValue: number;
  itemValue: ItemValue;
  minWidth: string;
  width: string;
  locTitle: LocalizableString;
  cell: MatrixDropdownCell;
  column: MatrixDropdownColumn;
  row: MatrixDropdownRowModelBase;
  question: Question;
  isRemoveRow: boolean;
  choiceIndex: number;
  isOtherChoice: boolean;
  matrix: QuestionMatrixDropdownModelBase;
  requiredText: string;
  isEmpty: boolean;
  colSpans: number;
  panel: PanelModel;
  isShowHideDetail: boolean;
  isActionsCell: boolean;
  isDragHandlerCell: boolean;
  classNameValue: string;
  get hasQuestion(): boolean;
  get hasTitle(): boolean;
  get hasPanel(): boolean;
  get id(): number;
  get showErrorOnTop(): boolean;
  get showErrorOnBottom(): boolean;
  get item(): ItemValue;
  set item(val: ItemValue);
  get isChoice(): boolean;
  get isItemChoice(): boolean;
  get choiceValue(): any;
  get isCheckbox(): boolean;
  get isRadio(): boolean;
  get isFirstChoice(): boolean;
  get className(): string;
  get headers(): string;
  getTitle(): string;
  calculateFinalClassName(matrixCssClasses: any): string;
}
export declare class RendererFactory {
  static Instance: RendererFactory;
  renderersHash: any;
  unregisterRenderer(questionType: string, rendererAs: string): void;
  registerRenderer(questionType: string, renderAs: string, renderer: any): void;
  getRenderer(questionType: string, renderAs: string): any;
  getRendererByQuestion(question: Question): any;
  clear(): void;
}
export declare class ResponsivityManager {
  constructor(container: any, model: any, itemsSelector: string, dotsItemSize?: number);
  resizeObserver: any;
  isInitialized: boolean;
  protected minDimensionConst: number;
  separatorSize: number;
  separatorAddConst: number;
  paddingSizeConst: number;
  protected recalcMinDimensionConst: boolean;
  getComputedStyle: (elt: any) => any;
  protected getDimensions(element: any): IDimensions;
  protected getAvailableSpace(): number;
  protected calcItemSize(item: any): number;
  dispose(): void;
}
export declare class StringEditorViewModel {
  constructor(locString: any);
  locString: any;
  get koHasHtml(): any;
  get editValue(): any;
  set editValue(val: any);
  onInput(sender: StringEditorViewModel, event: any): void;
  onClick(sender: StringEditorViewModel, event: any): void;
  dispose(): void;
}
export declare class StylesManager {
  constructor();
  static SurveyJSStylesSheetId: string;
  static Styles: any;
  static Media: any;
  static ThemeColors: any;
  static ThemeCss: any;
  static modernThemeCss: any;
  static bootstrapThemeCss: any;
  static bootstrapmaterialThemeCss: any;
  sheet: any;
  static applyTheme(themeName?: string, themeSelector?: string): void;
  static Enabled: boolean;
  initializeStyles(sheet: any): void;
}
export declare class SurveyError {
  constructor(text?: string, errorOwner?: ISurveyErrorOwner);
  text: string;
  locTextValue: LocalizableString;
  visible: boolean;
  equalsTo(error: SurveyError): boolean;
  get locText(): LocalizableString;
  getText(): string;
  getErrorType(): string;
  protected getDefaultText(): string;
  protected getLocale(): string;
  protected getLocalizationString(locStrName: string): string;
  onUpdateErrorTextCallback: (error: SurveyError) => void;
  updateText(): void;
}
export declare class SurveyProgressButtonsModel {
  constructor(survey: SurveyModel);
  isListElementClickable(index: number): boolean;
  getListElementCss(index: number): string;
  getScrollButtonCss(hasScroller: boolean, isLeftScroll: boolean): string;
  clickListElement(index: number): void;
}
export declare class SurveyProgressModel {
  static getProgressTextInBarCss(css: any): string;
  static getProgressTextUnderBarCss(css: any): string;
}
export declare class SurveyTemplateText {
  constructor();
  addText(newText: string, id: string, name: string): void;
  replaceText(replaceText: string, id: string, questionType?: string): void;
  protected getId(id: string, questionType: string): string;
  protected get text(): string;
  protected set text(val: string);
}
export declare class SurveyTimer {
  static instanceValue: SurveyTimer;
  static get instance(): SurveyTimer;
  listenerCounter: number;
  timerId: number;
  onTimer: Event<() => any, any>;
  start(func?: any): void;
  stop(func?: any): void;
  doTimer(): void;
}
export declare class SvgIconData {
}
export declare class SvgIconRegistry {
  icons: SvgIconData;
  iconPrefix: string;
  registerIconFromSymbol(iconId: string, iconSymbolSvg: string): void;
  registerIconFromSvgViaElement(iconId: string, iconSvg: string, iconPrefix?: string): void;
  registerIconFromSvg(iconId: string, iconSvg: string, iconPrefix?: string): boolean;
  registerIconsFromFolder(r: any): void;
  iconsRenderedHtml(): any;
  renderIcons(): void;
}
export declare class SyntaxError {
  constructor(message: string, expected: any, found: string, location: IFileRange);
  static buildMessage(expected: any, found: string): string;
  message: string;
  expected: any;
  found: string;
  location: IFileRange;
  name: string;
}
export declare class TextPreProcessor {
  _unObservableValues: any;
  onProcess: (textValue: TextPreProcessorValue) => void;
  process(text: string, returnDisplayValue?: boolean, doEncoding?: boolean): string;
  processValue(name: string, returnDisplayValue: boolean): TextPreProcessorValue;
  get hasAllValuesOnLastRun(): boolean;
}
export declare class TextPreProcessorItem {
  start: number;
  end: number;
}
export declare class TextPreProcessorValue {
  constructor(name: string, returnDisplayValue: boolean);
  name: string;
  returnDisplayValue: boolean;
  value: any;
  isExists: boolean;
  canProcess: boolean;
}
export declare class TooltipErrorViewModel {
  constructor(question: any);
  question: any;
  tooltipManager: any;
  afterRender: (elements: any) => void;
}
export declare class TooltipManager {
  constructor(tooltipElement: any);
  tooltipElement: any;
  targetElement: any;
  dispose(): void;
  onMouseMoveCallback: (e: any) => void;
}
export declare class ValidatorResult {
  constructor(value: any, error?: SurveyError);
  value: any;
  error: SurveyError;
}
export declare class ValidatorRunner {
  asyncValidators: any;
  onAsyncCompleted: (errors: any) => void;
  run(owner: IValidatorOwner): Array<SurveyError>;
}
export declare class XmlParser {
  parser: any;
  assignValue(target: any, name: string, value: any): void;
  xml2Json(xmlNode: any, result: any): void;
  parseXmlString(xmlString: string): any;
}
/*
* The class contains methods to work with api.surveyjs.io service.
*/
export declare class dxSurveyService {
  constructor();
  static get serviceUrl(): string;
  static set serviceUrl(val: string);
  loadSurvey(surveyId: string, onLoad: (success: boolean, result: string, response: any) => void): void;
  getSurveyJsonAndIsCompleted(surveyId: string, clientId: string, onLoad: (success: boolean, surveyJson: any, result: string, response: any) => void): void;
  sendResult(postId: string, result: any, onSendResult: (success: boolean, response: any, request?: any) => void, clientId?: string, isPartialCompleted?: boolean): void;
  sendFile(postId: string, file: any, onSendFile: (success: boolean, response: any) => void): void;
  getResult(resultId: string, name: string, onGetResult: (success: boolean, data: any, dataList: any, response: any) => void): void;
  isCompleted(resultId: string, clientId: string, onIsCompleted: (success: boolean, result: string, response: any) => void): void;
}
export declare class Action extends Base implements IAction, ILocalizableOwner {
  constructor(innerItem: IAction);
  innerItem: IAction;
  locTitleValue: any;
  updateCallback: any;
  owner: any;
  location: string;
  id: string;
  iconName: string;
  iconSize: number;
  visible: boolean;
  tooltip: string;
  locTooltipName: string;
  enabled: boolean;
  showTitle: boolean;
  action: (context?: any) => void;
  css: string;
  innerCss: string;
  data: any;
  popupModel: any;
  needSeparator: boolean;
  active: boolean;
  pressed: boolean;
  template: string;
  component: string;
  items: any;
  visibleIndex: number;
  mode: any;
  disableTabStop: boolean;
  disableShrink: boolean;
  disableHide: boolean;
  needSpace: boolean;
  title: string;
  get locTitle(): any;
  set locTitle(val: any);
  get locTitleName(): string;
  set locTitleName(val: string);
  locStrsChanged(): void;
  locTitleChanged: any;
  cssClassesValue: any;
  get cssClasses(): any;
  get disabled(): boolean;
  get hasTitle(): boolean;
  get isVisible(): boolean;
  get canShrink(): boolean;
  getActionRootCss(): string;
  getActionBarItemTitleCss(): string;
  getActionBarItemCss(): string;
  getLocale(): string;
  getMarkdownHtml(text: string, name: string): string;
  getProcessedText(text: string): string;
  getRenderer(name: string): string;
  getRendererContext(locStr: any): any;
  minDimension: number;
  maxDimension: number;
}
export declare class ActionContainer<T extends Action = Action> extends Base implements ILocalizableOwner {
  constructor();
  getMarkdownHtml(text: string, name: string): string;
  getRenderer(name: string): string;
  getRendererContext(locStr: LocalizableString): any;
  getProcessedText(text: string): string;
  getLocale(): string;
  actions: any;
  cssClassesValue: any;
  protected getRenderedActions(): Array<T>;
  updateCallback: (isResetInitialized: boolean) => void;
  containerCss: string;
  sizeMode: "default" | "small";
  locOwner: ILocalizableOwner;
  isEmpty: boolean;
  locStrsChanged(): void;
  protected raiseUpdate(isResetInitialized: boolean): void;
  protected onSet(): void;
  protected onPush(item: T): void;
  protected onRemove(item: T): void;
  get hasActions(): boolean;
  get renderedActions(): any;
  get visibleActions(): any;
  getRootCss(): string;
  protected getDefaultCssClasses(): any;
  get cssClasses(): any;
  addAction(val: IAction, sortByVisibleIndex?: boolean): Action;
  setItems(items: any, sortByVisibleIndex?: boolean): void;
  initResponsivityManager(container: any): void;
  resetResponsivityManager(): void;
  getActionById(id: string): T;
}
export declare class ActionContainerImplementor extends ImplementorBase {
  constructor(model: any, handleClick?: boolean);
  handleClick: boolean;
  itemsSubscription: any;
  dispose(): void;
}
export declare class AnswerRequiredError extends SurveyError {
  constructor(text?: string, errorOwner?: ISurveyErrorOwner);
  text: string;
  getErrorType(): string;
  protected getDefaultText(): string;
}
export declare class ArrayOperand extends Operand {
  constructor(values: any);
  values: any;
  getType(): string;
  toString(func?: (op: Operand) => string): string;
  evaluate(processValue?: ProcessValue): Array<any>;
  setVariables(variables: any): void;
  hasFunction(): boolean;
  hasAsyncFunction(): boolean;
  addToAsyncList(list: any): void;
  protected isContentEqual(op: Operand): boolean;
}
export declare class BinaryOperand extends Operand {
  constructor(operatorName: string, left?: any, right?: any, isArithmeticOp?: boolean);
  consumer: any;
  isArithmeticValue: boolean;
  getType(): string;
  get isArithmetic(): boolean;
  get isConjunction(): boolean;
  get conjunction(): string;
  get operator(): string;
  get leftOperand(): any;
  get rightOperand(): any;
  protected isContentEqual(op: Operand): boolean;
  evaluate(processValue?: ProcessValue): any;
  toString(func?: (op: Operand) => string): string;
  setVariables(variables: any): void;
  hasFunction(): boolean;
  hasAsyncFunction(): boolean;
  addToAsyncList(list: any): void;
}
/*
* The calculated value is a way to define the variable in Survey Creator.
* It has two main properties: name and expression. Based on expression the value read-only property is automatically calculated.
* The name property should be unique though all calculated values.
* It uses survey.getVariable/seruvey.setVariable functions to get/set its value. The class do not store its value internally.
* You may set includeIntoResult property to true to store this calculated value into survey result.
*/
export declare class CalculatedValue extends Base {
  constructor(name?: string, expression?: string);
  data: ISurveyData;
  expressionIsRunning: boolean;
  expressionRunner: ExpressionRunner;
  setOwner(data: ISurveyData): void;
  getType(): string;
  getSurvey(live?: boolean): ISurvey;
  get owner(): ISurveyData;
  /*
  * The calculated value name. It should be non empty and unique.
  */
  get name(): string;
  set name(val: string);
  /*
  * Set this property to true to include the non-empty calculated value into survey result, survey.data property.
  */
  get includeIntoResult(): boolean;
  set includeIntoResult(val: boolean);
  /*
  * The Expression that used to calculate the value. You may use standard operators like +, -, * and /, squares (). Here is the example of accessing the question value {questionname}.
  * Example: "({quantity} * {price}) * (100 - {discount}) / 100"
  */
  get expression(): string;
  set expression(val: string);
  locCalculation(): void;
  unlocCalculation(): void;
  isCalculated: boolean;
  resetCalculation(): void;
  doCalculation(calculatedValues: any, values: any, properties: any): void;
  runExpression(values: any, properties: any): void;
  get value(): any;
  protected setValue(val: any): void;
}
/*
* Configures access to a RESTful service that returns choices for [Checkbox](https://surveyjs.io/Examples/Library?id=questiontype-checkbox), [Dropdown](https://surveyjs.io/Examples/Library?id=questiontype-dropdown), [Radiogroup](https://surveyjs.io/Examples/Library?id=questiontype-radiogroup), and other multiple-choice question types.
* 
* Use the following properties to configure this object:
* 
* ```js
* {
*   url: "http://...", // A RESTful service's URL.
*   valueName: "value", // Specifies which field contains choice values.
*   titleName: "title", // Specifies which field contains display texts for choice values.
*   imageLinkName: "imageUrl", // Specifies which field contains image URLs. Used in Image Picker questions.
*   // Path to the array of choices. Specify `path` only if the array of choices is nested within the object returned by the service.
*   path: "myNestedArray"
* }
* ```
* 
* Typically, you should assign this object to a question's [`choicesByUrl`](https://surveyjs.io/Documentation/Library?id=QuestionSelectBase#choicesByUrl) property.
*/
export declare class ChoicesRestful extends Base {
  constructor();
  static cacheText: string;
  static noCacheText: string;
  static get EncodeParameters(): boolean;
  static set EncodeParameters(val: boolean);
  static clearCache(): void;
  static itemsResult: any;
  static sendingSameRequests: any;
  static onBeforeSendRequest: (sender: ChoicesRestful, options: any) => void;
  lastObjHash: string;
  isRunningValue: boolean;
  protected processedUrl: string;
  protected processedPath: string;
  isUsingCacheFromUrl: boolean;
  onProcessedUrlCallback: (url: string, path: string) => void;
  getResultCallback: (items: any) => void;
  beforeSendRequestCallback: any;
  updateResultCallback: (items: any, serverResult: any) => any;
  getItemValueCallback: (item: any) => any;
  error: SurveyError;
  owner: IQuestion;
  createItemValue: (value: any) => ItemValue;
  getSurvey(live?: boolean): ISurvey;
  run(textProcessor?: ITextProcessor): void;
  get isUsingCache(): boolean;
  get isRunning(): boolean;
  protected getIsRunning(): boolean;
  get isWaitingForParameters(): boolean;
  protected useChangedItemsResults(): boolean;
  protected parseResponse(response: any): any;
  protected sendRequest(): void;
  getType(): string;
  get isEmpty(): boolean;
  getCustomPropertiesNames(): Array<any>;
  setData(json: any): void;
  getData(): any;
  /*
  * A RESTful service's URL.
  * 
  * This property supports [dynamic URLs](https://surveyjs.io/Documentation/Library?id=design-survey-conditional-logic#dynamic-texts). For example, the URL below depends on the `region` question's value. When the value changes, the survey automatically loads a new dataset that corresponds to the selected region.
  * 
  * ```js
  * url: "https://surveyjs.io/api/CountriesExample?region={region}"
  * ```
  * 
  * [View Example](https://surveyjs.io/Examples/Library/?id=questiontype-dropdownrestfull (linkStyle))
  */
  get url(): string;
  set url(val: string);
  /*
  * Path to the array of choices.
  * 
  * Specify this property only if the array of choices is nested within the object returned by the service. For example, the service returns the following object:
  * 
  * ```js
  * {
  *   countries: [ ... ],
  *   capitals: [ ... ]
  * }
  * ```
  * 
  * To populate choices with values from the `countries` array, set the `path` property to `"countries"`. To use the `capitals` array, set this property to `"capitals"`.
  */
  get path(): string;
  set path(val: string);
  /*
  * Specifies which property in the obtained data object contains choice values.
  * 
  * [View Example](https://surveyjs.io/Examples/Library/?id=questiontype-dropdownrestfull (linkStyle))
  */
  get valueName(): string;
  set valueName(val: string);
  /*
  * Specifies which property in the obtained data object contains display texts for choices.
  */
  get titleName(): string;
  set titleName(val: string);
  /*
  * Specifies which property in the obtained data object contains image URLs. Used only in [Image Picker](https://surveyjs.io/Examples/Library?id=questiontype-imagepicker) questions.
  */
  get imageLinkName(): string;
  set imageLinkName(val: string);
  get allowEmptyResponse(): boolean;
  set allowEmptyResponse(val: boolean);
  get attachOriginalItems(): boolean;
  set attachOriginalItems(val: boolean);
  get itemValueType(): string;
  clear(): void;
  protected beforeSendRequest(): void;
  protected beforeLoadRequest(): void;
  protected onLoad(result: any, loadingObjHash?: string): void;
  protected callResultCallback(items: any, loadingObjHash: string): void;
}
export declare class ConditionRunner extends ExpressionRunnerBase {
  constructor(expression: string);
  onRunComplete: (result: boolean) => void;
  run(values: any, properties?: any): boolean;
  protected doOnComplete(res: any): void;
}
export declare class Const extends Operand {
  constructor(value: any);
  getType(): string;
  toString(func?: (op: Operand) => string): string;
  get correctValue(): any;
  evaluate(): any;
  setVariables(variables: any): void;
  protected getCorrectValue(value: any): any;
  protected isContentEqual(op: Operand): boolean;
}
export declare class CustomError extends SurveyError {
  constructor(text: string, errorOwner?: ISurveyErrorOwner);
  text: string;
  getErrorType(): string;
}
export declare class DragDropCore<T> extends Base {
  constructor(surveyValue?: ISurvey, creator?: any, longTap?: boolean);
  isBottom: boolean;
  onGhostPositionChanged: EventBase<Base>;
  protected ghostPositionChanged(): void;
  static PreventScrolling: boolean;
  onBeforeDrop: EventBase<DragDropCore<T>>;
  onAfterDrop: EventBase<DragDropCore<T>>;
  draggedElement: any;
  protected get draggedElementType(): string;
  protected parentElement: T;
  dropTarget: any;
  protected get dropTargetDataAttributeName(): string;
  protected get survey(): SurveyModel;
  prevDropTarget: any;
  protected draggedElementShortcut: any;
  scrollIntervalId: number;
  protected allowDropHere: boolean;
  startDrag(event: any, draggedElement: any, parentElement?: any, draggedElementNode?: any, preventSaveTargetNode?: boolean): void;
  timeoutID: any;
  startX: number;
  startY: number;
  currentX: number;
  currentY: number;
  savedTargetNode: any;
  stopLongTapIfMoveEnough: (pointerMoveEvent: any) => void;
  stopLongTap: (e?: any) => void;
  onContextMenu: (event: any) => void;
  dragOver: (event: any) => void;
  drop: any;
  protected isDropTargetDoesntChanged(newIsBottom: boolean): boolean;
  protected onStartDrag(): void;
  protected getShortcutText(draggedElement: IShortcutText): string;
  protected createDraggedElementShortcut(text: string, draggedElementNode?: any, event?: any): any;
  protected getDraggedElementClass(): string;
  protected doDragOver(dropTargetNode?: any, event?: any): void;
  protected afterDragOver(dropTargetNode?: any, event?: any): void;
  getGhostPosition(item: any): string;
  protected isDropTargetValid(dropTarget: any, dropTargetNode?: any): boolean;
  handlePointerCancel: (event: any) => void;
  protected handleEscapeButton: (event: any) => void;
  protected banDropHere: any;
  protected doBanDropHere: any;
  protected getDataAttributeValueByNode(node: any): any;
  protected getDropTargetByNode(dropTargetNode: any, event: any): any;
  protected getDropTargetByDataAttributeValue(dataAttributeValue: string, dropTargetNode?: any, event?: any): any;
  protected calculateVerticalMiddleOfHTMLElement(HTMLElement: any): number;
  protected calculateHorizontalMiddleOfHTMLElement(HTMLElement: any): number;
  protected calculateIsBottom(clientY: number, dropTargetNode?: any): boolean;
  protected findDropTargetNodeByDragOverNode(dragOverNode: any): any;
  protected doDrop(): any;
  protected clear: any;
  protected doClear(): void;
}
export declare class DropdownListModel extends Base {
  constructor(question: Question, onSelectionChanged?: (item: IAction, ...params: any) => void);
  _popupModel: any;
  focusFirstInputSelector: string;
  protected listModel: ListModel;
  protected popupCssClasses: string;
  protected onHidePopup(): void;
  protected getAvailableItems(): Array<Action>;
  protected createListModel(): ListModel;
  protected resetFilterString(): void;
  searchEnabled: boolean;
  filterString: string;
  get popupModel(): any;
  get inputReadOnly(): boolean;
  setSearchEnabled(newValue: boolean): void;
  updateItems(): void;
  onClick(event: any): void;
  onClear(event: any): void;
  keyHandler(event: any): void;
  onBlur(event: any): void;
  scrollToFocusedItem(): void;
}
export declare class EventBase<T> extends Event<any, any> {
}
export declare class ExceedSizeError extends SurveyError {
  constructor(maxSize: number, errorOwner?: ISurveyErrorOwner);
  getErrorType(): string;
  getDefaultText(): string;
}
export declare class ExpressionExecutor implements IExpresionExecutor {
  constructor(expression: string);
  static createExpressionExecutor: (expression: string) => IExpresionExecutor;
  onComplete: (res: any) => void;
  expressionValue: string;
  operand: Operand;
  processValue: ProcessValue;
  parser: ConditionsParser;
  isAsyncValue: boolean;
  hasFunctionValue: boolean;
  asyncFuncList: any;
  get expression(): string;
  getVariables(): Array<any>;
  hasFunction(): boolean;
  get isAsync(): boolean;
  canRun(): boolean;
  run(values: any, properties?: any): any;
}
/*
* Base class for HtmlConditionItem and UrlConditionItem classes.
*/
export declare class ExpressionItem extends Base implements ILocalizableOwner {
  constructor(expression?: string);
  locOwner: ILocalizableOwner;
  getType(): string;
  runCondition(values: any, properties: any): boolean;
  /*
  * The expression property. If this expression returns true, then survey will use html property to show on complete page.
  */
  get expression(): string;
  set expression(val: string);
  get locHtml(): LocalizableString;
  getLocale(): string;
  getMarkdownHtml(text: string, name: string): string;
  getRenderer(name: string): string;
  getRendererContext(locStr: LocalizableString): any;
  getProcessedText(text: string): string;
  getSurvey(isLive?: boolean): ISurvey;
}
export declare class ExpressionRunner extends ExpressionRunnerBase {
  constructor(expression: string);
  onRunComplete: (result: any) => void;
  run(values: any, properties?: any): any;
  protected doOnComplete(res: any): void;
}
export declare class FunctionOperand extends Operand {
  constructor(originalValue: string, parameters: ArrayOperand);
  isReadyValue: boolean;
  asynResult: any;
  onAsyncReady: any;
  getType(): string;
  evaluateAsync(processValue: ProcessValue): void;
  evaluate(processValue?: ProcessValue): any;
  toString(func?: (op: Operand) => string): string;
  setVariables(variables: any): void;
  get isReady(): boolean;
  hasFunction(): boolean;
  hasAsyncFunction(): boolean;
  addToAsyncList(list: any): void;
  protected isContentEqual(op: Operand): boolean;
}
/*
* Array of ItemValue is used in checkox, dropdown and radiogroup choices, matrix columns and rows.
* It has two main properties: value and text. If text is empty, value is used for displaying.
* The text property is localizable and support markdown.
*/
export declare class ItemValue extends Base implements ILocalizableOwner, IShortcutText {
  constructor(value: any, text?: string, typeName?: string);
  getMarkdownHtml(text: string, name: string): string;
  getRenderer(name: string): string;
  getRendererContext(locStr: LocalizableString): any;
  getProcessedText(text: string): string;
  static get Separator(): string;
  static set Separator(val: string);
  /*
  * Resets the input array and fills it with values from the values array
  */
  static setData(items: any, values: any, type?: string): void;
  static getData(items: any): any;
  static getItemByValue(items: any, val: any): ItemValue;
  static getTextOrHtmlByValue(items: any, val: any): string;
  static locStrsChanged(items: any): void;
  static runConditionsForItems(items: any, filteredItems: any, runner: ConditionRunner, values: any, properties: any, useItemExpression?: boolean, onItemCallBack?: (item: ItemValue, val: boolean) => boolean): boolean;
  static runEnabledConditionsForItems(items: any, runner: ConditionRunner, values: any, properties: any, onItemCallBack?: (item: ItemValue, val: boolean) => boolean): boolean;
  ownerPropertyName: string;
  locTextValue: LocalizableString;
  visibleConditionRunner: ConditionRunner;
  enableConditionRunner: ConditionRunner;
  onCreating(): any;
  getType(): string;
  getSurvey(live?: boolean): ISurvey;
  getLocale(): string;
  get locText(): LocalizableString;
  setLocText(locText: LocalizableString): void;
  _locOwner: ILocalizableOwner;
  get locOwner(): ILocalizableOwner;
  set locOwner(val: ILocalizableOwner);
  get value(): any;
  set value(val: any);
  get hasText(): boolean;
  get pureText(): string;
  set pureText(val: string);
  get text(): string;
  set text(val: string);
  get calculatedText(): string;
  get shortcutText(): string;
  getData(): any;
  toJSON(): any;
  setData(value: any): void;
  get visibleIf(): string;
  set visibleIf(val: string);
  get enableIf(): string;
  set enableIf(val: string);
  get isVisible(): any;
  setIsVisible(val: boolean): void;
  get isEnabled(): any;
  setIsEnabled(val: boolean): void;
  addUsedLocales(locales: any): void;
  locStrsChanged(): void;
  protected onPropertyValueChanged(name: string, oldValue: any, newValue: any): void;
  protected getConditionRunner(isVisible: boolean): ConditionRunner;
  originalItem: any;
}
export declare class JsonMissingTypeErrorBase extends JsonError {
  constructor(baseClassName: string, type: string, message: string);
  baseClassName: string;
  type: string;
  message: string;
}
/*
* Contains information about a property of a survey element (page, panel, questions, and etc).
*/
export declare class JsonObjectProperty implements IObject {
  constructor(classInfo: JsonMetadataClass, name: string, isRequired?: boolean);
  name: string;
  static getItemValuesDefaultValue: (val: any, type: string) => any;
  static Index: number;
  static mergableValues: any;
  idValue: number;
  classInfoValue: JsonMetadataClass;
  typeValue: string;
  choicesValue: any;
  baseValue: any;
  isRequiredValue: boolean;
  isUniqueValue: boolean;
  uniquePropertyValue: string;
  readOnlyValue: boolean;
  visibleValue: boolean;
  isLocalizableValue: boolean;
  choicesfunc: (obj: any, choicesCallback: any) => any;
  dependedProperties: any;
  isSerializable: boolean;
  isLightSerializable: boolean;
  isCustom: boolean;
  isDynamicChoices: boolean;
  isBindable: boolean;
  className: string;
  alternativeName: string;
  classNamePart: string;
  baseClassName: string;
  defaultValueValue: any;
  serializationProperty: string;
  displayName: string;
  category: string;
  categoryIndex: number;
  visibleIndex: number;
  nextToProperty: string;
  showMode: string;
  maxLength: number;
  maxValue: any;
  minValue: any;
  dataListValue: any;
  layout: string;
  onGetValue: (obj: any) => any;
  onSettingValue: (obj: any, value: any) => any;
  onSetValue: (obj: any, value: any, jsonConv: JsonObject) => any;
  visibleIf: (obj: any) => boolean;
  onExecuteExpression: (obj: any, res: any) => any;
  onPropertyEditorUpdate: (obj: any, propEditor: any) => any;
  get id(): number;
  get classInfo(): JsonMetadataClass;
  get type(): string;
  set type(val: string);
  isArray: boolean;
  get isRequired(): boolean;
  set isRequired(val: boolean);
  get isUnique(): boolean;
  set isUnique(val: boolean);
  get uniquePropertyName(): string;
  set uniquePropertyName(val: string);
  get hasToUseGetValue(): any;
  get defaultValue(): any;
  set defaultValue(val: any);
  isDefaultValue(value: any): boolean;
  getValue(obj: any): any;
  getPropertyValue(obj: any): any;
  get hasToUseSetValue(): any;
  settingValue(obj: any, value: any): any;
  setValue(obj: any, value: any, jsonConv: JsonObject): void;
  getObjType(objType: string): any;
  getClassName(className: string): string;
  /*
  * Depricated, please use getChoices
  */
  get choices(): any;
  get hasChoices(): boolean;
  getChoices(obj: any, choicesCallback?: any): Array<any>;
  setChoices(value: any, valueFunc?: (obj: any) => any): void;
  getBaseValue(): string;
  setBaseValue(val: any): void;
  get readOnly(): boolean;
  set readOnly(val: boolean);
  isVisible(layout: string, obj?: any): boolean;
  get visible(): boolean;
  set visible(val: boolean);
  get isLocalizable(): boolean;
  set isLocalizable(val: boolean);
  get dataList(): any;
  set dataList(val: any);
  mergeWith(prop: JsonObjectProperty): void;
  addDependedProperty(name: string): void;
  getDependedProperties(): Array<any>;
  schemaType(): string;
}
export declare class JsonRequiredPropertyError extends JsonError {
  constructor(propertyName: string, className: string);
  propertyName: string;
  className: string;
}
export declare class JsonUnknownPropertyError extends JsonError {
  constructor(propertyName: string, className: string);
  propertyName: string;
  className: string;
}
export declare class KeyDuplicationError extends SurveyError {
  constructor(text: string, errorOwner?: ISurveyErrorOwner);
  text: string;
  getErrorType(): string;
  protected getDefaultText(): string;
}
/*
* The class represents the string that supports multi-languages and markdown.
* It uses in all objects where support for multi-languages and markdown is required.
*/
export declare class LocalizableString implements ILocalizableString {
  constructor(owner: ILocalizableOwner, useMarkdown?: boolean, name?: string);
  owner: ILocalizableOwner;
  useMarkdown: boolean;
  name: string;
  static SerializeAsObject: boolean;
  static get defaultLocale(): string;
  static set defaultLocale(val: string);
  static defaultRenderer: string;
  static editableRenderer: string;
  values: any;
  htmlValues: any;
  renderedText: string;
  calculatedTextValue: string;
  localizationName: string;
  onGetTextCallback: (str: string) => string;
  onGetDefaultTextCallback: any;
  storeDefaultText: boolean;
  onGetLocalizationTextCallback: (str: string) => string;
  onStrChanged: (oldValue: string, newValue: string) => void;
  onSearchChanged: any;
  sharedData: LocalizableString;
  searchText: string;
  searchIndex: number;
  getIsMultiple(): boolean;
  get locale(): string;
  strChanged(): void;
  get text(): string;
  set text(val: string);
  get calculatedText(): string;
  get pureText(): string;
  get hasHtml(): boolean;
  get html(): string;
  get isEmpty(): boolean;
  get textOrHtml(): string;
  get renderedHtml(): string;
  getLocaleText(loc: string): string;
  setLocaleText(loc: string, value: string): void;
  hasNonDefaultText(): boolean;
  getLocales(): Array<any>;
  getJson(): any;
  setJson(value: any): void;
  get renderAs(): string;
  get renderAsData(): any;
  equals(obj: any): boolean;
  searchableText: string;
  setFindText(text: string): boolean;
  onChanged(): void;
  onStringChanged: EventBase<LocalizableString>;
  protected onCreating(): void;
  getHtmlValue(): string;
}
/*
* The class represents the list of strings that supports multi-languages.
*/
export declare class LocalizableStrings implements ILocalizableString {
  constructor(owner: ILocalizableOwner);
  owner: ILocalizableOwner;
  values: any;
  onValueChanged: (oldValue: any, newValue: any) => void;
  getIsMultiple(): boolean;
  get locale(): string;
  get value(): any;
  set value(val: any);
  get text(): string;
  set text(val: string);
  getLocaleText(loc: string): string;
  setLocaleText(loc: string, newValue: string): any;
  getValue(loc: string): Array<any>;
  setValue(loc: string, val: any): void;
  hasValue(loc?: string): boolean;
  get isEmpty(): boolean;
  getLocales(): Array<any>;
  getJson(): any;
  setJson(value: any): void;
}
export declare class MatrixDropdownColumn extends Base implements ILocalizableOwner, IWrapperObject {
  constructor(name: string, title?: string);
  static getColumnTypes(): Array<any>;
  templateQuestionValue: Question;
  colOwnerValue: IMatrixColumnOwner;
  indexValue: number;
  _isVisible: boolean;
  _hasVisibleCell: boolean;
  getOriginalObj(): Base;
  getClassNameProperty(): string;
  getSurvey(live?: boolean): ISurvey;
  endLoadingFromJson(): void;
  getDynamicPropertyName(): string;
  getDynamicType(): string;
  get colOwner(): IMatrixColumnOwner;
  set colOwner(val: IMatrixColumnOwner);
  locStrsChanged(): void;
  addUsedLocales(locales: any): void;
  get index(): number;
  setIndex(val: number): void;
  getType(): string;
  get cellType(): string;
  set cellType(val: string);
  get templateQuestion(): Question;
  get value(): string;
  get isVisible(): boolean;
  setIsVisible(newVal: boolean): void;
  get hasVisibleCell(): boolean;
  set hasVisibleCell(val: boolean);
  get name(): string;
  set name(val: string);
  get title(): string;
  set title(val: string);
  get locTitle(): LocalizableString;
  get fullTitle(): string;
  get isRequired(): boolean;
  set isRequired(val: boolean);
  get isRenderedRequired(): boolean;
  set isRenderedRequired(val: boolean);
  updateIsRenderedRequired(val: boolean): void;
  get requiredText(): string;
  get requiredErrorText(): string;
  set requiredErrorText(val: string);
  get locRequiredErrorText(): LocalizableString;
  get readOnly(): boolean;
  set readOnly(val: boolean);
  get hasOther(): boolean;
  set hasOther(val: boolean);
  get visibleIf(): string;
  set visibleIf(val: string);
  get enableIf(): string;
  set enableIf(val: string);
  get requiredIf(): string;
  set requiredIf(val: string);
  get isUnique(): boolean;
  set isUnique(val: boolean);
  get showInMultipleColumns(): boolean;
  set showInMultipleColumns(val: boolean);
  get isSupportMultipleColumns(): boolean;
  get isShowInMultipleColumns(): boolean;
  get validators(): any;
  set validators(val: any);
  get totalType(): string;
  set totalType(val: string);
  get totalExpression(): string;
  set totalExpression(val: string);
  get hasTotal(): boolean;
  get totalFormat(): string;
  set totalFormat(val: string);
  get locTotalFormat(): LocalizableString;
  get cellHint(): string;
  set cellHint(val: string);
  get locCellHint(): LocalizableString;
  get renderAs(): string;
  set renderAs(val: string);
  get totalMaximumFractionDigits(): number;
  set totalMaximumFractionDigits(val: number);
  get totalMinimumFractionDigits(): number;
  set totalMinimumFractionDigits(val: number);
  get totalDisplayStyle(): string;
  set totalDisplayStyle(val: string);
  get totalCurrency(): string;
  set totalCurrency(val: string);
  get minWidth(): string;
  set minWidth(val: string);
  get width(): string;
  set width(val: string);
  get colCount(): number;
  set colCount(val: number);
  getLocale(): string;
  getMarkdownHtml(text: string, name: string): string;
  getRenderer(name: string): string;
  getRendererContext(locStr: LocalizableString): any;
  getProcessedText(text: string): string;
  createCellQuestion(row: MatrixDropdownRowModelBase): Question;
  startLoadingFromJson(json?: any): void;
  updateCellQuestion(cellQuestion: Question, data: any, onUpdateJson?: (json: any) => any): void;
  defaultCellTypeChanged(): void;
  protected calcCellQuestionType(row: MatrixDropdownRowModelBase): string;
  protected updateTemplateQuestion(newCellType?: string): void;
  protected createNewQuestion(cellType: string): Question;
  previousChoicesId: string;
  protected setQuestionProperties(question: Question, onUpdateJson?: (json: any) => any): void;
  protected propertyValueChanged(name: string, oldValue: any, newValue: any): void;
}
export declare class MatrixDropdownRowModelBase implements ISurveyData, ISurveyImpl, ILocalizableOwner {
  constructor(data: IMatrixDropdownData, value: any);
  static RowVariableName: string;
  static OwnerVariableName: string;
  static IndexVariableName: string;
  static RowValueVariableName: string;
  static idCounter: number;
  protected data: IMatrixDropdownData;
  protected isSettingValue: boolean;
  idValue: string;
  textPreProcessor: MatrixDropdownRowTextProcessor;
  detailPanelValue: PanelModel;
  cells: any;
  showHideDetailPanelClick: any;
  onDetailPanelShowingChanged: any;
  get id(): string;
  get rowName(): any;
  get text(): any;
  get value(): any;
  set value(val: any);
  get locText(): LocalizableString;
  get hasPanel(): boolean;
  get detailPanel(): PanelModel;
  get detailPanelId(): string;
  get isDetailPanelShowing(): boolean;
  isCreatingDetailPanel: boolean;
  showDetailPanel(): void;
  hideDetailPanel(destroyPanel?: boolean): void;
  getAllValues(): any;
  getFilteredValues(): any;
  getFilteredProperties(): any;
  runCondition(values: any, properties: any): void;
  clearValue(): void;
  onAnyValueChanged(name: string): void;
  getDataValueCore(valuesHash: any, key: string): any;
  getValue(name: string): any;
  setValue(name: string, newColumnValue: any): void;
  getVariable(name: string): any;
  setVariable(name: string, newValue: any): void;
  getComment(name: string): string;
  setComment(name: string, newValue: string, locNotification: any): void;
  get isEmpty(): boolean;
  getQuestionByColumn(column: MatrixDropdownColumn): Question;
  getCellByColumn(column: MatrixDropdownColumn): MatrixDropdownCell;
  getQuestionByColumnName(columnName: string): Question;
  get questions(): any;
  getQuestionByName(name: string): Question;
  getQuestionsByName(name: string): Array<Question>;
  protected getSharedQuestionByName(columnName: string): Question;
  clearIncorrectValues(val: any): void;
  getLocale(): string;
  getMarkdownHtml(text: string, name: string): string;
  getRenderer(name: string): string;
  getRendererContext(locStr: LocalizableString): any;
  getProcessedText(text: string): string;
  locStrsChanged(): void;
  updateCellQuestionOnColumnChanged(column: MatrixDropdownColumn, name: string, newValue: any): void;
  updateCellQuestionOnColumnItemValueChanged(column: MatrixDropdownColumn, propertyName: string, obj: ItemValue, name: string, newValue: any, oldValue: any): void;
  onQuestionReadOnlyChanged(parentIsReadOnly: boolean): void;
  hasErrors(fireCallback: boolean, rec: any, raiseOnCompletedAsyncValidators: any): boolean;
  protected updateCellOnColumnChanged(cell: MatrixDropdownCell, name: string, newValue: any): void;
  updateCellOnColumnItemValueChanged(cell: MatrixDropdownCell, propertyName: string, obj: ItemValue, name: string, newValue: any, oldValue: any): void;
  protected buildCells(value: any): void;
  protected isTwoValueEquals(val1: any, val2: any): boolean;
  protected createCell(column: MatrixDropdownColumn): MatrixDropdownCell;
  getSurveyData(): ISurveyData;
  getSurvey(): ISurvey;
  getTextProcessor(): ITextProcessor;
  get rowIndex(): number;
  get editingObj(): Base;
  onEditingObjPropertyChanged: (sender: Base, options: any) => void;
  editingObjValue: Base;
  dispose(): void;
}
export declare class MatrixDropdownTotalCell extends MatrixDropdownCell {
  constructor(column: MatrixDropdownColumn, row: MatrixDropdownRowModelBase, data: IMatrixDropdownData);
  column: MatrixDropdownColumn;
  row: MatrixDropdownRowModelBase;
  data: IMatrixDropdownData;
  protected createQuestion(column: MatrixDropdownColumn, row: MatrixDropdownRowModelBase, data: IMatrixDropdownData): Question;
  locStrsChanged(): void;
  updateCellQuestion(): void;
  getTotalExpression(): string;
}
export declare class MatrixRowModel extends Base {
  constructor(item: ItemValue, fullName: string, data: IMatrixData, value: any);
  fullName: string;
  data: IMatrixData;
  item: ItemValue;
  cellClick: any;
  get name(): string;
  get text(): string;
  get locText(): LocalizableString;
  get value(): any;
  set value(val: any);
  get rowClasses(): string;
}
export declare class MinRowCountError extends SurveyError {
  constructor(minRowCount: number, errorOwner?: ISurveyErrorOwner);
  minRowCount: number;
  getErrorType(): string;
  protected getDefaultText(): string;
}
export declare class MultipleTextItemModel extends Base implements IValidatorOwner, ISurveyData, ISurveyImpl {
  constructor(name?: any, title?: string);
  editorValue: QuestionTextModel;
  data: IMultipleTextData;
  valueChangedCallback: (newValue: any) => void;
  getType(): string;
  get id(): string;
  getOriginalObj(): Base;
  /*
  * The item name.
  */
  get name(): string;
  set name(val: string);
  get question(): Question;
  get editor(): QuestionTextModel;
  protected createEditor(name: string): QuestionTextModel;
  addUsedLocales(locales: any): void;
  locStrsChanged(): void;
  setData(data: IMultipleTextData): void;
  /*
  * Set this property to true, to make the item a required. If a user doesn't fill the item then a validation error will be generated.
  */
  get isRequired(): boolean;
  set isRequired(val: boolean);
  /*
  * Use this property to change the default input type.
  */
  get inputType(): string;
  set inputType(val: string);
  /*
  * Item title. If it is empty, the item name is rendered as title. This property supports markdown.
  */
  get title(): string;
  set title(val: string);
  get locTitle(): LocalizableString;
  /*
  * Returns the text or html for rendering the title.
  */
  get fullTitle(): string;
  /*
  * The maximum text length. If it is -1, defaul value, then the survey maxTextLength property will be used.
  * If it is 0, then the value is unlimited
  */
  get maxLength(): number;
  set maxLength(val: number);
  getMaxLength(): any;
  /*
  * The input place holder.
  */
  get placeholder(): string;
  set placeholder(val: string);
  get locPlaceholder(): LocalizableString;
  get placeHolder(): string;
  set placeHolder(val: string);
  get locPlaceHolder(): LocalizableString;
  /*
  * The custom text that will be shown on required error. Use this property, if you do not want to show the default text.
  */
  get requiredErrorText(): string;
  set requiredErrorText(val: string);
  get locRequiredErrorText(): LocalizableString;
  /*
  * The input size.
  */
  get size(): number;
  set size(val: number);
  /*
  * The list of question validators.
  */
  get validators(): any;
  set validators(val: any);
  getValidators(): Array<SurveyValidator>;
  /*
  * The item value.
  */
  get value(): any;
  set value(val: any);
  isEmpty(): boolean;
  onValueChanged(newValue: any): void;
  getSurveyData(): ISurveyData;
  getSurvey(): ISurvey;
  getTextProcessor(): ITextProcessor;
  getValue(name: string): any;
  setValue(name: string, value: any): void;
  getVariable(name: string): any;
  setVariable(name: string, newValue: any): void;
  getComment(name: string): string;
  setComment(name: string, newValue: string): void;
  getAllValues(): any;
  getFilteredValues(): any;
  getFilteredProperties(): any;
  getValidatorTitle(): string;
  get validatedValue(): any;
  set validatedValue(val: any);
  getDataFilteredValues(): any;
  getDataFilteredProperties(): any;
}
export declare class OneAnswerRequiredError extends SurveyError {
  constructor(text?: string, errorOwner?: ISurveyErrorOwner);
  text: string;
  getErrorType(): string;
  protected getDefaultText(): string;
}
export declare class OtherEmptyError extends SurveyError {
  constructor(text: string, errorOwner?: ISurveyErrorOwner);
  text: string;
  getErrorType(): string;
  protected getDefaultText(): string;
}
export declare class PanelImplementorBase extends ImplementorBase {
  constructor(panel: any);
  panel: any;
}
export declare class PopupBaseViewModel extends Base {
  constructor(model: any, targetElement?: any);
  targetElement: any;
  prevActiveElement: any;
  scrollEventCallBack: any;
  top: string;
  left: string;
  height: string;
  width: string;
  minWidth: string;
  isVisible: boolean;
  popupDirection: string;
  pointerTarget: IPosition;
  container: any;
  _model: any;
  get model(): any;
  set model(val: any);
  get title(): string;
  get contentComponentName(): string;
  get contentComponentData(): any;
  get showPointer(): boolean;
  get isModal(): boolean;
  get isFocusedContent(): boolean;
  get showFooter(): boolean;
  get isOverlay(): boolean;
  get styleClass(): string;
  onKeyDown(event: any): void;
  updateOnShowing(): void;
  updateOnHiding(): void;
  clickOutside(): void;
  cancel(): void;
  apply(): void;
  get cancelButtonText(): string;
  get applyButtonText(): string;
  dispose(): void;
  initializePopupContainer(): void;
  unmountPopupContainer(): void;
}
export declare class PopupModel<T = any> extends Base {
  constructor(contentComponentName: string, contentComponentData: T, verticalPosition?: any, horizontalPosition?: any, showPointer?: boolean, isModal?: boolean, onCancel?: any, onApply?: any, onHide?: any, onShow?: any, cssClass?: string, title?: string);
  setWidthByTarget: boolean;
  focusFirstInputSelector: string;
  contentComponentName: string;
  contentComponentData: T;
  verticalPosition: any;
  horizontalPosition: any;
  showPointer: boolean;
  isModal: boolean;
  isFocusedContent: boolean;
  onCancel: any;
  onApply: any;
  onHide: any;
  onShow: any;
  cssClass: string;
  title: string;
  displayMode: "popup" | "overlay";
  positionMode: any;
  onVisibilityChanged: EventBase<PopupModel<any>>;
  onTargetModified: EventBase<Base>;
  get isVisible(): boolean;
  set isVisible(val: boolean);
  toggleVisibility(): void;
  targetModified(): void;
}
export declare class PopupSurveyImplementor extends ImplementorBase {
  constructor(window: any);
  window: any;
}
/*
* A Model for a survey running in the Popup Window.
*/
export declare class PopupSurveyModel extends Base {
  constructor(jsonObj: any, initialModel?: SurveyModel);
  static surveyElementName: string;
  surveyValue: SurveyModel;
  windowElement: any;
  templateValue: string;
  expandedChangedCallback: any;
  showingChangedCallback: any;
  protected onCreating(): void;
  getType(): string;
  /*
  * A survey object.
  */
  get survey(): SurveyModel;
  /*
  * Set this value to negative value, for example -1, to avoid closing the popup window on completing the survey. Leave it equals to 0 (default value) to close the popup window immediately, or set it to 3, 5, 10, ... to close the popup window in 3, 5, 10 seconds.
  */
  closeOnCompleteTimeout: number;
  /*
  * Returns true if the popup window is currently showing. Set it to true to show the popup window and false to hide it.
  */
  get isShowing(): boolean;
  set isShowing(val: boolean);
  /*
  * Show the popup window
  */
  show(): void;
  /*
  * Hide the popup window
  */
  hide(): void;
  /*
  * Returns true if the popup window is expanded. Set it to true to expand the popup window or false to collapse it.
  */
  get isExpanded(): boolean;
  set isExpanded(val: boolean);
  protected onExpandedChanged(): void;
  /*
  * The popup window and survey title.
  */
  get title(): string;
  set title(val: string);
  get locTitle(): LocalizableString;
  /*
  * Expand the popup window to show the survey.
  */
  expand(): void;
  /*
  * Collapse the popup window and show survey title only.
  */
  collapse(): void;
  changeExpandCollapse(): void;
  get css(): any;
  get cssButton(): string;
  get cssRoot(): string;
  get cssBody(): string;
  get cssHeaderRoot(): string;
  get cssHeaderTitle(): string;
  protected createSurvey(jsonObj: any): SurveyModel;
  protected onSurveyComplete(): void;
}
export declare class QuestionImplementor extends ImplementorBase {
  constructor(question: any);
  question: any;
  disposedObjects: any;
  callBackFunctions: any;
  koDummy: any;
  koElementType: any;
  _koValue: any;
  protected setObservaleObj(name: string, obj: any, addToQuestion?: boolean): any;
  protected setCallbackFunc(name: string, func: any): void;
  protected getKoValue(): any;
  protected setKoValue(val: any): void;
  protected onSurveyLoad(): void;
  protected getQuestionTemplate(): string;
  protected getNo(): string;
  protected updateKoDummy(): void;
  protected koQuestionAfterRender(elements: any, con: any): void;
  dispose(): void;
}
export declare class QuestionMatrixDropdownRenderedRow extends Base {
  constructor(cssClasses: any, isDetailRow?: boolean);
  cssClasses: any;
  isDetailRow: boolean;
  isGhostRow: boolean;
  isAdditionalClasses: boolean;
  row: MatrixDropdownRowModelBase;
  static counter: number;
  idValue: number;
  cells: any;
  get id(): number;
  get attributes(): { "data-sv-drop-target-matrix-row"?: undefined; } | { "data-sv-drop-target-matrix-row": string; };
  get className(): string;
}
export declare class QuestionMatrixDropdownRenderedTable extends Base {
  constructor(matrix: QuestionMatrixDropdownModelBase);
  matrix: QuestionMatrixDropdownModelBase;
  headerRowValue: QuestionMatrixDropdownRenderedRow;
  footerRowValue: QuestionMatrixDropdownRenderedRow;
  hasRemoveRowsValue: boolean;
  rowsActions: any;
  cssClasses: any;
  renderedRowsChangedCallback: any;
  rows: any;
  get showTable(): boolean;
  get showHeader(): boolean;
  get showAddRowOnTop(): boolean;
  get showAddRowOnBottom(): boolean;
  get showFooter(): boolean;
  get hasFooter(): boolean;
  get hasRemoveRows(): boolean;
  isRequireReset(): boolean;
  get headerRow(): QuestionMatrixDropdownRenderedRow;
  get footerRow(): QuestionMatrixDropdownRenderedRow;
  protected build(): void;
  updateShowTableAndAddRow(): void;
  onAddedRow(): void;
  onRemovedRow(row: MatrixDropdownRowModelBase): void;
  onDetailPanelChangeVisibility(row: MatrixDropdownRowModelBase, isShowing: boolean): void;
  protected buildRowsActions(): void;
  protected createRenderedRow(cssClasses: any, isDetailRow?: boolean): QuestionMatrixDropdownRenderedRow;
  protected buildHeader(): void;
  protected buildFooter(): void;
  protected buildRows(): void;
  hasActionCellInRowsValues: any;
  protected setDefaultRowActions(row: MatrixDropdownRowModelBase, actions: any): void;
}
export declare class QuestionPanelDynamicItem implements ISurveyData, ISurveyImpl {
  constructor(data: IQuestionPanelDynamicData, panel: PanelModel);
  static ItemVariableName: string;
  static ParentItemVariableName: string;
  static IndexVariableName: string;
  panelValue: PanelModel;
  data: IQuestionPanelDynamicData;
  textPreProcessor: QuestionPanelDynamicItemTextProcessor;
  get panel(): PanelModel;
  setSurveyImpl(): void;
  getValue(name: string): any;
  setValue(name: string, newValue: any): void;
  getVariable(name: string): any;
  setVariable(name: string, newValue: any): void;
  getComment(name: string): string;
  setComment(name: string, newValue: string, locNotification: any): void;
  getAllValues(): any;
  getFilteredValues(): any;
  getFilteredProperties(): any;
  getSurveyData(): ISurveyData;
  getSurvey(): ISurvey;
  getTextProcessor(): ITextProcessor;
}
export declare class QuestionPanelDynamicTemplateSurveyImpl implements ISurveyImpl {
  constructor(data: IQuestionPanelDynamicData);
  data: IQuestionPanelDynamicData;
  getSurveyData(): ISurveyData;
  getSurvey(): ISurvey;
  getTextProcessor(): ITextProcessor;
}
export declare class QuestionRowModel extends Base {
  constructor(panel: PanelModelBase);
  panel: PanelModelBase;
  static rowCounter: number;
  protected _scrollableParent: any;
  protected _updateVisibility: any;
  startLazyRendering(rowContainerDiv: any, findScrollableContainer?: (element: any) => any): void;
  ensureVisibility(): void;
  stopLazyRendering(): void;
  idValue: string;
  isLazyRenderingValue: boolean;
  setIsLazyRendering(val: boolean): void;
  isLazyRendering(): boolean;
  get id(): string;
  get elements(): any;
  get visibleElements(): any;
  get visible(): boolean;
  set visible(val: boolean);
  get isNeedRender(): boolean;
  set isNeedRender(val: boolean);
  updateVisible(): void;
  addElement(q: IElement): void;
  get index(): number;
  setElementMaxMinWidth(el: IElement): void;
  dispose(): void;
  getRowCss(): string;
}
export declare class QuestionTextProcessor implements ITextProcessor {
  constructor(variableName: string);
  textPreProcessor: TextPreProcessor;
  processValue(name: string, returnDisplayValue: boolean): TextPreProcessorValue;
  protected get survey(): ISurvey;
  protected get panel(): PanelModel;
  protected getValues(): any;
  protected getQuestionByName(name: string): Question;
  protected getParentTextProcessor(): ITextProcessor;
  protected onCustomProcessText(textValue: TextPreProcessorValue): boolean;
  protected getQuestionDisplayText(question: Question): string;
  processText(text: string, returnDisplayValue: boolean): string;
  processTextEx(text: string, returnDisplayValue: boolean): any;
}
export declare class RenderedRatingItem extends Base {
  constructor(itemValue: ItemValue, locString?: LocalizableString);
  itemValue: ItemValue;
  get value(): number;
  get locText(): LocalizableString;
}
export declare class RequiredInAllRowsError extends SurveyError {
  constructor(text: string, errorOwner?: ISurveyErrorOwner);
  text: string;
  getErrorType(): string;
  protected getDefaultText(): string;
}
export declare class RequreNumericError extends SurveyError {
  constructor(text?: string, errorOwner?: ISurveyErrorOwner);
  text: string;
  getErrorType(): string;
  protected getDefaultText(): string;
}
/*
* A base class for the [`SurveyElement`](https://surveyjs.io/form-library/documentation/surveyelement) and [`SurveyModel`](https://surveyjs.io/form-library/documentation/surveymodel) classes.
*/
export declare class SurveyElementCore extends Base implements ILocalizableOwner {
  constructor();
  protected createLocTitleProperty(): LocalizableString;
  /*
  * A title for the survey element. If `title` is undefined, the `name` property value is displayed instead.
  * 
  * Empty pages and panels do not display their titles or names.
  */
  get title(): string;
  set title(val: string);
  get locTitle(): LocalizableString;
  protected getDefaultTitleValue(): string;
  /*
  * Returns `true` if the survey element has a description.
  */
  hasDescription: boolean;
  /*
  * Explanatory text displayed under the title.
  */
  get description(): string;
  set description(val: string);
  updateDescriptionVisibility(newDescription: any): void;
  get locDescription(): LocalizableString;
  get titleTagName(): string;
  protected getDefaultTitleTagName(): string;
  get hasTitle(): boolean;
  get hasTitleActions(): boolean;
  get hasTitleEvents(): boolean;
  getTitleToolbar(): AdaptiveActionContainer;
  getTitleOwner(): ITitleOwner;
  get isTitleOwner(): boolean;
  toggleState(): boolean;
  get cssClasses(): any;
  get cssTitle(): string;
  get ariaTitleId(): string;
  get titleTabIndex(): number;
  get titleAriaExpanded(): boolean;
  get ariaLabel(): string;
  get titleAriaLabel(): string;
  getLocale(): string;
  getMarkdownHtml(text: string, name: string): string;
  getRenderer(name: string): string;
  getRendererContext(locStr: LocalizableString): any;
  getProcessedText(text: string): string;
}
export declare class SurveyImplementor extends ImplementorBase {
  constructor(survey: any);
  survey: any;
  renderedElement: any;
  render(element?: any): void;
  koEventAfterRender(element: any, survey: any): void;
  dispose(): void;
}
export declare class SurveyTimerModel extends Base {
  constructor(survey: ISurvey);
  onTimer: (page: PageModel) => void;
  surveyValue: ISurvey;
  text: string;
  spent: number;
  get survey(): ISurvey;
  onCreating(): void;
  timerFunc: any;
  start(): void;
  stop(): void;
  get isRunning(): boolean;
}
/*
* Base SurveyJS validator class.
*/
export declare class SurveyValidator extends Base {
  constructor();
  errorOwner: ISurveyErrorOwner;
  onAsyncCompleted: (result: ValidatorResult) => void;
  getSurvey(live?: boolean): ISurvey;
  get text(): string;
  set text(val: string);
  get isValidateAllValues(): boolean;
  get locText(): LocalizableString;
  protected getErrorText(name: string): string;
  protected getDefaultErrorText(name: string): string;
  validate(value: any, name?: string, values?: any, properties?: any): ValidatorResult;
  get isRunning(): boolean;
  get isAsync(): boolean;
  getLocale(): string;
  getMarkdownHtml(text: string, name: string): string;
  getRenderer(name: string): string;
  getRendererContext(locStr: LocalizableString): any;
  getProcessedText(text: string): string;
  protected createCustomError(name: string): SurveyError;
  toString(): string;
}
/*
* A base class for all triggers.
* A trigger calls a method when the expression change the result: from false to true or from true to false.
* Please note, it runs only one changing the expression result.
*/
export declare class Trigger extends Base {
  constructor();
  static operatorsValue: any;
  conditionRunner: ConditionRunner;
  usedNames: any;
  hasFunction: boolean;
  getType(): string;
  toString(): string;
  get operator(): string;
  set operator(val: string);
  get value(): any;
  set value(val: any);
  get name(): string;
  set name(val: string);
  get expression(): string;
  set expression(val: string);
  protected canBeExecuted(isOnNextPage: boolean): boolean;
  protected isExecutingOnNextPage: boolean;
  checkExpression(isOnNextPage: boolean, keys: any, values: any, properties?: any): void;
  check(value: any): void;
  protected onSuccess(values: any, properties: any): void;
  protected onFailure(): void;
  protected onSuccessExecuted(): void;
  endLoadingFromJson(): void;
  buildExpression(): string;
}
export declare class UnaryOperand extends Operand {
  constructor(expressionValue: Operand, operatorName: string);
  consumer: any;
  get operator(): string;
  get expression(): Operand;
  getType(): string;
  toString(func?: (op: Operand) => string): string;
  protected isContentEqual(op: Operand): boolean;
  evaluate(processValue?: ProcessValue): boolean;
  setVariables(variables: any): void;
}
export declare class UploadingFileError extends SurveyError {
  constructor(text: string, errorOwner?: ISurveyErrorOwner);
  text: string;
  getErrorType(): string;
  protected getDefaultText(): string;
}
export declare class VerticalResponsivityManager extends ResponsivityManager {
  constructor(container: any, model: any, itemsSelector: string, dotsItemSize?: number, minDimension?: number);
  protected getDimensions(): IDimensions;
  protected getAvailableSpace(): number;
  protected calcItemSize(item: any): number;
}
export declare class WebRequestEmptyError extends SurveyError {
  constructor(text: string, errorOwner?: ISurveyErrorOwner);
  text: string;
  getErrorType(): string;
  protected getDefaultText(): string;
}
export declare class WebRequestError extends SurveyError {
  constructor(status: string, response: string, errorOwner?: ISurveyErrorOwner);
  status: string;
  response: string;
  getErrorType(): string;
  protected getDefaultText(): string;
}
export declare class AdaptiveActionContainer<T extends Action = Action> extends ActionContainer<T> {
  constructor();
  protected dotsItem: Action;
  responsivityManager: ResponsivityManager;
  minVisibleItemsCount: number;
  isResponsivenessDisabled: boolean;
  static ContainerID: number;
  get hiddenItemsListModel(): ListModel;
  protected hiddenItemSelected(item: T): void;
  protected onSet(): void;
  protected onPush(item: T): void;
  protected getRenderedActions(): Array<T>;
  protected raiseUpdate(isResetInitialized: boolean): void;
  fit(dimension: number, dotsItemSize: number): void;
  initResponsivityManager(container: any): void;
  resetResponsivityManager(): void;
  setActionsMode(mode: any): void;
  dispose(): void;
}
/*
* Validates the number of answers.
*/
export declare class AnswerCountValidator extends SurveyValidator {
  constructor(minCount?: number, maxCount?: number);
  getType(): string;
  validate(value: any, name?: string, values?: any, properties?: any): ValidatorResult;
  protected getDefaultErrorText(name: string): string;
  /*
  * The minCount property.
  */
  get minCount(): number;
  set minCount(val: number);
  /*
  * The maxCount property.
  */
  get maxCount(): number;
  set maxCount(val: number);
}
export declare class ButtonGroupItemValue extends ItemValue {
  constructor(value: any, text?: string, typeName?: string);
  iconName: string;
  iconSize: number;
  /*
  * By default item caption is visible.
  * Set it 'false' to hide item caption.
  */
  showCaption: boolean;
  getType(): string;
}
/*
* Obsolete, please use ChoicesRestful
*/
export declare class ChoicesRestfull extends ChoicesRestful {
  constructor();
  static get EncodeParameters(): boolean;
  static set EncodeParameters(val: boolean);
  static clearCache(): void;
  static get onBeforeSendRequest(): (sender: ChoicesRestful, options: any) => void;
  static set onBeforeSendRequest(val: (sender: ChoicesRestful, options: any) => void);
}
export declare class DragDropChoices extends DragDropCore<QuestionSelectBase> {
  constructor(surveyValue?: ISurvey, creator?: any, longTap?: boolean);
  protected get draggedElementType(): string;
  protected createDraggedElementShortcut(text: string, draggedElementNode: any, event: any): any;
  protected findDropTargetNodeByDragOverNode(dragOverNode: any): any;
  protected getDropTargetByDataAttributeValue(dataAttributeValue: string): ItemValue;
  protected doDragOver: any;
  protected isDropTargetValid(dropTarget: ItemValue): boolean;
  protected doBanDropHere: any;
  protected calculateIsBottom(clientY: number): boolean;
  protected afterDragOver(dropTargetNode: any): void;
  protected doDrop(): any;
  protected doClear(): void;
}
export declare class DragDropMatrixRows extends DragDropCore<QuestionMatrixDynamicModel> {
  constructor(surveyValue?: ISurvey, creator?: any, longTap?: boolean);
  protected get draggedElementType(): string;
  protected createDraggedElementShortcut(text: string, draggedElementNode: any, event: any): any;
  fromIndex: number;
  toIndex: number;
  protected getDropTargetByDataAttributeValue(dataAttributeValue: any): MatrixDropdownRowModelBase;
  protected isDropTargetValid(dropTarget: any): boolean;
  protected findDropTargetNodeByDragOverNode(dragOverNode: any): any;
  protected calculateIsBottom(clientY: number): boolean;
  protected afterDragOver(dropTargetNode: any): void;
  protected doDrop: any;
  protected doClear(): void;
}
export declare class DragDropSurveyElements extends DragDropCore<any> {
  constructor(surveyValue?: ISurvey, creator?: any, longTap?: boolean);
  static newGhostPage: PageModel;
  static restrictDragQuestionBetweenPages: boolean;
  static edgeHeight: number;
  static nestedPanelDepth: number;
  static ghostSurveyElementName: string;
  protected isEdge: boolean;
  protected prevIsEdge: any;
  protected ghostSurveyElement: IElement;
  protected get draggedElementType(): string;
  protected isDraggedElementSelected: boolean;
  isRight: boolean;
  protected prevIsRight: boolean;
  startDragToolboxItem(event: any, draggedElementJson: JsonObject, toolboxItemTitle: string): void;
  startDragSurveyElement(event: any, draggedElement: any, isElementSelected?: boolean): void;
  protected getShortcutText(draggedElement: IShortcutText): string;
  protected createDraggedElementShortcut(text: string, draggedElementNode?: any, event?: any): any;
  protected createDraggedElementIcon(): any;
  protected getDraggedElementClass(): string;
  protected createElementFromJson(json: any): any;
  protected getDropTargetByDataAttributeValue(dataAttributeValue: string, dropTargetNode: any, event: any): any;
  protected isDropTargetValid(): boolean;
  protected calculateIsBottom(clientY: number, dropTargetNode?: any): boolean;
  protected calculateIsRight(clientX: number, dropTargetNode?: any): boolean;
  protected isDropTargetDoesntChanged(newIsBottom: boolean): boolean;
  protected findDeepestDropTargetChild(parent: any): any;
  protected doDragOver(dropTargetNode?: any, event?: any): void;
  protected afterDragOver(dropTargetNode: any, event: any): void;
  protected onStartDrag(): void;
  protected doBanDropHere: any;
  protected doDrop: any;
  protected doClear: any;
  protected insertGhostElementIntoSurvey(): boolean;
  protected removeGhostElementFromSurvey(): void;
}
export declare class DropdownMultiSelectListModel extends DropdownListModel {
  constructor(question: Question, onSelectionChanged?: (item: IAction, ...params: any) => void);
  filterStringPlaceholder: string;
  closeOnSelect: boolean;
  protected override: any;
  createListModel(): MultiSelectListModel;
  selectAllItems(): void;
  selectNoneItem(): void;
  selectItem(id: string): void;
  deselectItem(id: string): void;
  onClear(event: any): void;
  setHideSelectedItems(newValue: boolean): void;
  removeLastSelectedItem(): void;
  inputKeyHandler(event: any): void;
}
/*
* Validate e-mail address in the text input
*/
export declare class EmailValidator extends SurveyValidator {
  constructor();
  re: any;
  getType(): string;
  validate(value: any, name?: string, values?: any, properties?: any): ValidatorResult;
  protected getDefaultErrorText(name: string): string;
}
/*
* Show error if expression returns false
*/
export declare class ExpressionValidator extends SurveyValidator {
  constructor(expression?: string);
  conditionRunner: ConditionRunner;
  isRunningValue: boolean;
  getType(): string;
  get isValidateAllValues(): boolean;
  get isAsync(): boolean;
  get isRunning(): boolean;
  validate(value: any, name?: string, values?: any, properties?: any): ValidatorResult;
  protected generateError(res: boolean, value: any, name: string): ValidatorResult;
  protected getDefaultErrorText(name: string): string;
  protected ensureConditionRunner(): boolean;
  /*
  * The expression property.
  */
  get expression(): string;
  set expression(val: string);
}
/*
* A class that contains expression and html propeties. It uses in survey.completedHtmlOnCondition array.
* If the expression returns true then html of this item uses instead of survey.completedHtml property
*/
export declare class HtmlConditionItem extends ExpressionItem {
  constructor(expression?: string, html?: string);
  getType(): string;
  /*
  * The html that shows on completed ('Thank you') page. The expression should return true
  */
  get html(): string;
  set html(val: string);
  get locHtml(): LocalizableString;
}
export declare class ImageItemValue extends ItemValue implements ILocalizableOwner {
  constructor(value: any, text?: string, typeName?: string);
  getType(): string;
  /*
  * The image or video link property.
  */
  get imageLink(): string;
  set imageLink(val: string);
  aspectRatio: number;
  get locImageLink(): LocalizableString;
  getLocale(): string;
  getMarkdownHtml(text: string, name: string): string;
  getRenderer(name: string): string;
  getRendererContext(locStr: LocalizableString): any;
  getProcessedText(text: string): string;
}
export declare class JsonIncorrectTypeError extends JsonMissingTypeErrorBase {
  constructor(propertyName: string, baseClassName: string);
  propertyName: string;
  baseClassName: string;
}
export declare class JsonMissingTypeError extends JsonMissingTypeErrorBase {
  constructor(propertyName: string, baseClassName: string);
  propertyName: string;
  baseClassName: string;
}
export declare class KoQuestionMatrixDropdownRenderedTable extends QuestionMatrixDropdownRenderedTable {
  protected createRenderedRow(cssClasses: any, isDetailRow?: boolean): any;
}
export declare class ListModel extends ActionContainer {
  constructor(items: any, onSelectionChanged: (item: Action, ...params: any) => void, allowSelection: boolean, selectedItem?: IAction, onFilterStringChangedCallback?: (text: string) => void);
  onSelectionChanged: (item: Action, ...params: any) => void;
  allowSelection: boolean;
  searchEnabled: boolean;
  showFilter: boolean;
  isExpanded: boolean;
  selectedItem: IAction;
  focusedItem: Action;
  filterString: string;
  static INDENT: number;
  static MINELEMENTCOUNT: number;
  isItemVisible(item: Action): boolean;
  get visibleItems(): any;
  protected onSet(): void;
  protected getDefaultCssClasses(): any;
  protected updateItemActiveState(): void;
  onItemClick: (itemValue: Action) => void;
  isItemDisabled: (itemValue: Action) => boolean;
  isItemSelected: (itemValue: Action) => boolean;
  isItemFocused: (itemValue: Action) => boolean;
  getItemClass: (itemValue: Action) => string;
  getItemIndent: (itemValue: any) => string;
  get filterStringPlaceholder(): string;
  get emptyMessage(): string;
  goToItems(event: any): void;
  onMouseMove(event: any): void;
  onKeyDown(event: any): void;
  onPointerDown(event: any, item: any): void;
  refresh(): void;
  resetFocusedItem(): void;
  focusFirstVisibleItem(): void;
  focusLastVisibleItem(): void;
  initFocusedItem(): void;
  focusNextVisibleItem(): void;
  focusPrevVisibleItem(): void;
  selectFocusedItem(): void;
}
export declare class MatrixDropdownRowModel extends MatrixDropdownRowModelBase {
  constructor(name: string, item: ItemValue, data: IMatrixDropdownData, value: any);
  name: string;
  item: ItemValue;
  get rowName(): string;
  get text(): string;
  get locText(): LocalizableString;
}
export declare class MatrixDropdownRowTextProcessor extends QuestionTextProcessor {
  constructor(row: MatrixDropdownRowModelBase, variableName: string, parentTextProcessor: ITextProcessor);
  protected getParentTextProcessor(): ITextProcessor;
  protected get survey(): ISurvey;
  protected getValues(): any;
  protected getQuestionByName(name: string): Question;
  protected onCustomProcessText(textValue: TextPreProcessorValue): boolean;
}
export declare class MatrixDropdownTotalRowModel extends MatrixDropdownRowModelBase {
  constructor(data: IMatrixDropdownData);
  protected createCell(column: MatrixDropdownColumn): MatrixDropdownCell;
  setValue(name: string, newValue: any): void;
  runCondition(values: any, properties: any): void;
  protected updateCellOnColumnChanged(cell: MatrixDropdownCell, name: string, newValue: any): void;
}
export declare class MatrixDynamicRowModel extends MatrixDropdownRowModelBase implements IShortcutText {
  constructor(index: number, data: IMatrixDropdownData, value: any);
  index: number;
  dragOrClickHelper: DragOrClickHelper;
  get rowName(): string;
  get shortcutText(): string;
}
export declare class MultipleTextItem extends MultipleTextItemModel {
  constructor(name?: any, title?: string);
  protected createEditor(name: string): QuestionTextModel;
}
/*
* Validate numeric values.
*/
export declare class NumericValidator extends SurveyValidator {
  constructor(minValue?: number, maxValue?: number);
  getType(): string;
  validate(value: any, name?: string, values?: any, properties?: any): ValidatorResult;
  protected getDefaultErrorText(name: string): string;
  /*
  * The minValue property.
  */
  get minValue(): number;
  set minValue(val: number);
  /*
  * The maxValue property.
  */
  get maxValue(): number;
  set maxValue(val: number);
}
export declare class PopupSurvey extends PopupSurveyModel {
  constructor(jsonObj: any, initialModel?: any);
}
export declare class QuestionCompositeTextProcessor extends QuestionTextProcessor {
  constructor(composite: QuestionCompositeModel, variableName: string);
  protected get survey(): ISurvey;
  protected get panel(): PanelModel;
}
export declare class QuestionFileImplementor extends QuestionImplementor {
  constructor(question: QuestionFile);
}
export declare class QuestionMatrixBaseImplementor extends QuestionImplementor {
  constructor(question: any);
  _tableImplementor: ImplementorBase;
  koRecalc: any;
  get matrix(): any;
  protected getQuestionTemplate(): string;
  protected isAddRowTop(): boolean;
  protected isAddRowBottom(): boolean;
  protected addRow(): void;
  protected removeRow(row: any): void;
  dispose(): void;
}
export declare class QuestionMatrixDynamicRenderedTable extends QuestionMatrixDropdownRenderedTable {
  constructor(matrix: QuestionMatrixDropdownModelBase);
  matrix: QuestionMatrixDropdownModelBase;
  protected setDefaultRowActions(row: MatrixDropdownRowModelBase, actions: any): void;
}
export declare class QuestionMultipleTextImplementor extends QuestionImplementor {
  constructor(question: QuestionMultipleText);
  koRecalc: any;
}
export declare class QuestionPanelDynamicImplementor extends QuestionImplementor {
  constructor(question: QuestionPanelDynamic);
  koRecalc: any;
  protected onPanelCountChanged(): void;
  protected onRenderModeChanged(): void;
  protected onCurrentIndexChanged(): void;
  protected addPanel(): void;
  protected removePanel(val: any): void;
  dispose(): void;
}
export declare class QuestionPanelDynamicItemTextProcessor extends QuestionTextProcessor {
  constructor(data: IQuestionPanelDynamicData, panelItem: QuestionPanelDynamicItem, variableName: string);
  sharedQuestions: any;
  protected get survey(): ISurvey;
  protected get panel(): PanelModel;
  protected getValues(): any;
  protected getQuestionByName(name: string): Question;
  protected getQuestionDisplayText(question: Question): string;
  protected onCustomProcessText(textValue: TextPreProcessorValue): boolean;
}
export declare class QuestionRatingImplementor extends QuestionImplementor {
  constructor(question: any);
  protected onCreated(): void;
  dispose(): void;
}
export declare class QuestionRow extends QuestionRowModel {
  constructor(panel: any);
  panel: any;
  koElementAfterRender: any;
  getElementType(el: any): "survey-panel" | "survey-question";
  koAfterRender(el: any, con: any): void;
  rowAfterRender(elements: any, model: QuestionRow): void;
  dispose(): void;
}
export declare class QuestionSelectBaseImplementor extends QuestionImplementor {
  constructor(question: any);
  protected onCreated(): void;
  protected get isOtherSelected(): boolean;
}
/*
* Use it to validate the text by regular expressions.
*/
export declare class RegexValidator extends SurveyValidator {
  constructor(regex?: string);
  getType(): string;
  validate(value: any, name?: string, values?: any, properties?: any): ValidatorResult;
  /*
  * The regex property.
  */
  get regex(): string;
  set regex(val: string);
}
/*
* A base class for all survey elements.
*/
export declare class SurveyElement extends SurveyElementCore implements ISurveyElement {
  constructor(name: string);
  stateChangedCallback: any;
  static getProgressInfoByElements(children: any, isRequired: boolean): IProgressInfo;
  surveyImplValue: ISurveyImpl;
  surveyDataValue: ISurveyData;
  surveyValue: ISurvey;
  textProcessorValue: ITextProcessor;
  selectedElementInDesignValue: SurveyElement;
  dragTypeOverMe: DragTypeOverMeEnum;
  isDragMe: boolean;
  readOnlyChangedCallback: any;
  static ScrollElementToTop(elementId: string): boolean;
  static GetFirstNonTextElement(elements: any, removeSpaces?: boolean): any;
  static FocusElement(elementId: string): boolean;
  static CreateDisabledDesignElements: boolean;
  disableDesignActions: boolean;
  protected onPropertyValueChanged(name: string, oldValue: any, newValue: any): void;
  protected getSkeletonComponentNameCore(): string;
  get skeletonComponentName(): string;
  /*
  * Gets and sets the survey element's expand state.
  * 
  * Possible values:
  * 
  * - `"collapsed"` - The survey element displays only `title` and `description`.
  * - `"expanded"` - The survey element is displayed in full.
  */
  get state(): string;
  set state(val: string);
  /*
  * Returns `true` if the survey element is collapsed.
  */
  get isCollapsed(): boolean;
  /*
  * Returns `true` if the survey element is expanded.
  */
  get isExpanded(): boolean;
  /*
  * Collapses the survey element.
  * 
  * In collapsed state, the element displays only `title` and `description`.
  */
  collapse(): void;
  /*
  * Expands the survey element.
  */
  expand(): void;
  /*
  * Toggles the survey element's `state` between collapsed and expanded.
  */
  toggleState(): boolean;
  get hasStateButton(): boolean;
  get shortcutText(): string;
  titleToolbarValue: any;
  getTitleToolbar(): AdaptiveActionContainer;
  protected createActionContainer(allowAdaptiveActions?: boolean): ActionContainer;
  get titleActions(): any;
  isTitleActionRequested: boolean;
  getTitleActions(): Array<any>;
  protected getDefaultTitleActions(): Array<IAction>;
  get hasTitleActions(): boolean;
  get hasTitleEvents(): boolean;
  get titleTabIndex(): number;
  get titleAriaExpanded(): boolean;
  setSurveyImpl(value: ISurveyImpl, isLight?: boolean): void;
  protected canRunConditions(): boolean;
  getDataFilteredValues(): any;
  getDataFilteredProperties(): any;
  protected get surveyImpl(): ISurveyImpl;
  __setData(data: ISurveyData): void;
  get data(): ISurveyData;
  /*
  * Returns the survey object.
  */
  get survey(): ISurvey;
  getSurvey(live?: boolean): ISurvey;
  protected setSurveyCore(value: ISurvey): void;
  isContentElement: boolean;
  isEditableTemplateElement: boolean;
  isInteractiveDesignElement: boolean;
  protected get isInternal(): boolean;
  get areInvisibleElementsShowing(): boolean;
  get isVisible(): boolean;
  /*
  * Returns `true` if the survey element or its parent element is read-only.
  */
  get isReadOnly(): boolean;
  /*
  * Makes the survey element read-only.
  */
  get readOnly(): boolean;
  set readOnly(val: boolean);
  protected onReadOnlyChanged(): void;
  cssClassesValue: any;
  /*
  * Returns an object in which keys are UI elements and values are CSS classes applied to them.
  * 
  * Use the following events of the [`SurveyModel`](https://surveyjs.io/form-library/documentation/surveymodel) object to override CSS classes:
  * 
  * - [`onUpdatePageCssClasses`](https://surveyjs.io/form-library/documentation/surveymodel#onUpdatePageCssClasses)
  * - [`onUpdatePanelCssClasses`](https://surveyjs.io/form-library/documentation/surveymodel#onUpdatePanelCssClasses)
  * - [`onUpdateQuestionCssClasses`](https://surveyjs.io/form-library/documentation/surveymodel#onUpdateQuestionCssClasses)
  */
  get cssClasses(): any;
  protected calcCssClasses(css: any): any;
  protected updateElementCssCore(cssClasses: any): void;
  get cssError(): string;
  updateElementCss(reNew?: boolean): void;
  protected clearCssClasses(): void;
  protected getIsLoadingFromJson(): boolean;
  /*
  * A survey element identifier.
  */
  get name(): string;
  set name(val: string);
  protected getValidName(name: string): string;
  protected onNameChanged(oldValue: string): void;
  protected updateBindingValue(valueName: string, value: any): void;
  /*
  * Validation errors. Call the `hasErrors()` method to validate survey element data.
  */
  get errors(): any;
  set errors(val: any);
  hasVisibleErrors: boolean;
  /*
  * Returns `true` if the survey element or its child elements have a validation error.
  * 
  * This property contains the result of the most recent validation. This result may be outdated. Call the `hasErrors` method to get an up-to-date value.
  */
  get containsErrors(): boolean;
  updateContainsErrors(): void;
  protected getContainsErrors(): boolean;
  getElementsInDesign(includeHidden?: boolean): Array<IElement>;
  get selectedElementInDesign(): SurveyElement;
  set selectedElementInDesign(val: SurveyElement);
  updateCustomWidgets(): void;
  onSurveyLoad(): void;
  onFirstRendering(): void;
  endLoadingFromJson(): void;
  setVisibleIndex(index: number): number;
  /*
  * Returns `true` if the survey element is a page.
  */
  get isPage(): boolean;
  /*
  * Returns `true` if the survey element is a panel.
  */
  get isPanel(): boolean;
  /*
  * Returns `true` if the survey element is a question.
  */
  get isQuestion(): boolean;
  delete(): void;
  locOwner: ILocalizableOwner;
  /*
  * Returns the survey's [locale](https://surveyjs.io/form-library/documentation/surveymodel#locale).
  */
  getLocale(): string;
  getMarkdownHtml(text: string, name: string): string;
  getRenderer(name: string): string;
  getRendererContext(locStr: LocalizableString): any;
  getProcessedText(text: string): string;
  protected getUseDisplayValuesInTitle(): boolean;
  protected removeSelfFromList(list: any): void;
  protected get textProcessor(): ITextProcessor;
  protected getProcessedHtml(html: string): string;
  protected onSetData(): void;
  get parent(): IPanel;
  set parent(val: IPanel);
  protected getPage(parent: IPanel): IPage;
  protected moveToBase(parent: IPanel, container: IPanel, insertBefore?: any): boolean;
  protected setPage(parent: IPanel, newPage: IPage): void;
  protected getSearchableLocKeys(keys: any): void;
  protected get isDefaultV2Theme(): boolean;
  get isErrorsModeTooltip(): boolean;
  protected getIsErrorsModeTooltip(): boolean;
  get hasParent(): boolean;
  isSingleInRow: boolean;
  protected get hasFrameV2(): boolean;
  /*
  * Sets survey element width in CSS values.
  * 
  * Default value: ""
  */
  get width(): string;
  set width(val: string);
  /*
  * Gets or sets minimum survey element width in CSS values.
  * 
  * Default value: "300px" (taken from [`settings.minWidth`](https://surveyjs.io/form-library/documentation/settings#minWidth))
  */
  get minWidth(): string;
  set minWidth(val: string);
  /*
  * Gets or sets maximum survey element width in CSS values.
  * 
  * Default value: "100%" (taken from [`settings.maxWidth`](https://surveyjs.io/form-library/documentation/settings#maxWidth))
  */
  get maxWidth(): string;
  set maxWidth(val: string);
  /*
  * Returns a calculated width of the rendered survey element in CSS values.
  */
  get renderWidth(): string;
  set renderWidth(val: string);
  /*
  * Increases or decreases indent of the survey element content from the left edge. Accepts positive integer values and 0.
  */
  get indent(): number;
  set indent(val: number);
  /*
  * Increases or decreases indent of the survey element content from the right edge. Accepts positive integer values and 0.
  */
  get rightIndent(): number;
  set rightIndent(val: number);
  get paddingLeft(): string;
  set paddingLeft(val: string);
  get paddingRight(): string;
  set paddingRight(val: string);
  allowRootStyle: boolean;
  get rootStyle(): any;
  get clickTitleFunction(): any;
  protected needClickTitleFunction(): boolean;
  protected processTitleClick(): void;
  localeChanged(): void;
}
/*
* The `Survey` object contains information about the survey, Pages, Questions, flow logic and etc.
*/
export declare class SurveyModel extends SurveyElementCore implements ISurvey, ISurveyData, ISurveyImpl, ISurveyTriggerOwner, ISurveyErrorOwner, ISurveyTimerText {
  constructor(jsonObj?: any, renderedElement?: any);
  static TemplateRendererComponentName: string;
  static get cssType(): string;
  static set cssType(val: string);
  static stylesManager: StylesManager;
  static platform: string;
  get platformName(): string;
  /*
  * You can display an additional field (comment field) for the most of questions; users can enter additional comments to their response.
  * The comment field input is saved as `'question name' + 'commentPrefix'`.
  */
  get commentPrefix(): string;
  set commentPrefix(val: string);
  valuesHash: any;
  variablesHash: any;
  editingObjValue: Base;
  textPreProcessor: TextPreProcessor;
  timerModelValue: SurveyTimerModel;
  navigationBarValue: any;
  /*
  * The event is fired after a trigger has been executed
  * - `sender` - the survey object that fires the event.
  * - `options.trigger` - An instance of a trigger that has been just perform it's action.
  */
  onTriggerExecuted: EventBase<SurveyModel>;
  /*
  * The event is fired before the survey is completed and the `onComplete` event is fired. You can prevent the survey from completing by setting `options.allowComplete` to `false`
  * - `sender` - the survey object that fires the event.
  * - `options.allowComplete` - Specifies whether a user can complete a survey. Set this property to `false` to prevent the survey from completing. The default value is `true`.
  * - `options.isCompleteOnTrigger` - returns true if the survey is completing on "complete" trigger.
  */
  onCompleting: EventBase<SurveyModel>;
  /*
  * The event is fired after a user clicks the 'Complete' button and finishes a survey. Use this event to send the survey data to your web server.
  * - `sender` - the survey object that fires the event.
  * - `options.showDataSaving(text)` - call this method to show that the survey is saving survey data on your server. The `text` is an optional parameter to show a custom message instead of default.
  * - `options.showDataSavingError(text)` - call this method to show that an error occurred while saving the data on your server. If you want to show a custom error, use an optional `text` parameter.
  * - `options.showDataSavingSuccess(text)` - call this method to show that the data was successfully saved on the server.
  * - `options.showDataSavingClear` - call this method to hide the text about the saving progress.
  * - `options.isCompleteOnTrigger` - returns true if the survey is completed on "complete" trigger.
  */
  onComplete: EventBase<SurveyModel>;
  /*
  * The event is fired before the survey is going to preview mode, state equals to `preview`. It happens when a user click on "Preview" button. It shows when "showPreviewBeforeComplete" proeprty equals to "showAllQuestions" or "showAnsweredQuestions".
  * You can prevent showing it by setting allowShowPreview to `false`.
  * - `sender` - the survey object that fires the event.
  * - `options.allowShowPreview` - Specifies whether a user can see a preview. Set this property to `false` to prevent from showing the preview. The default value is `true`.
  */
  onShowingPreview: EventBase<SurveyModel>;
  /*
  * The event is fired after a user clicks the 'Complete' button. The event allows you to specify the URL opened after completing a survey.
  * Specify the `navigateToUrl` property to make survey navigate to another url.
  * - `sender` - the survey object that fires the event.
  * - `options.url` - Specifies a URL opened after completing a survey. Set this property to an empty string to cancel the navigation and show the completed survey page.
  */
  onNavigateToUrl: EventBase<SurveyModel>;
  /*
  * The event is fired after the survey changed it's state from "starting" to "running". The "starting" state means that survey shows the started page.
  * The `firstPageIsStarted` property should be set to `true`, if you want to display a start page in your survey. In this case, an end user should click the "Start" button to start the survey.
  */
  onStarted: EventBase<SurveyModel>;
  /*
  * The event is fired on clicking the 'Next' button if the `sendResultOnPageNext` is set to `true`. You can use it to save the intermediate results, for example, if your survey is large enough.
  * - `sender` - the survey object that fires the event.
  */
  onPartialSend: EventBase<SurveyModel>;
  /*
  * The event is fired before the current page changes to another page. Typically it happens when a user click the 'Next' or 'Prev' buttons.
  * - `sender` - the survey object that fires the event.
  * - `option.oldCurrentPage` - the previous current/active page.
  * - `option.newCurrentPage` - a new current/active page.
  * - `option.allowChanging` - set it to `false` to disable the current page changing. It is `true` by default.
  * - `option.isNextPage` - commonly means, that end-user press the next page button. In general, it means that options.newCurrentPage is the next page after options.oldCurrentPage
  * - `option.isPrevPage` - commonly means, that end-user press the previous page button. In general, it means that options.newCurrentPage is the previous page before options.oldCurrentPage
  */
  onCurrentPageChanging: EventBase<SurveyModel>;
  /*
  * The event is fired when the current page has been changed to another page. Typically it happens when a user click on 'Next' or 'Prev' buttons.
  * - `sender` - the survey object that fires the event.
  * - `option.oldCurrentPage` - a previous current/active page.
  * - `option.newCurrentPage` - a new current/active page.
  * - `option.isNextPage` - commonly means, that end-user press the next page button. In general, it means that options.newCurrentPage is the next page after options.oldCurrentPage
  * - `option.isPrevPage` - commonly means, that end-user press the previous page button. In general, it means that options.newCurrentPage is the previous page before options.oldCurrentPage
  */
  onCurrentPageChanged: EventBase<SurveyModel>;
  /*
  * The event is fired before the question value (answer) is changed. It can be done via UI by a user or programmatically on calling the `setValue` method.
  * - `sender` - the survey object that fires the event.
  * - `options.name` - the value name that has being changed.
  * - `options.question` - a question which `question.name` equals to the value name. If there are several questions with the same name, the first question is used. If there is no such questions, the `options.question` is null.
  * - `options.oldValue` - an old, previous value.
  * - `options.value` - a new value. You can change it.
  */
  onValueChanging: EventBase<SurveyModel>;
  /*
  * The event is fired when the question value (i.e., answer) has been changed. The question value can be changed in UI (by a user) or programmatically (on calling `setValue` method).
  * Use the `onDynamicPanelItemValueChanged` and `onMatrixCellValueChanged` events to handle changes in a question in the Panel Dynamic and a cell question in matrices.
  * - `sender` - the survey object that fires the event.
  * - `options.name` - the value name that has been changed.
  * - `options.question` - a question which `question.name` equals to the value name. If there are several questions with the same name, the first question is used. If there is no such questions, the `options.question` is `null`.
  * - `options.value` - a new value.
  */
  onValueChanged: EventBase<SurveyModel>;
  /*
  * The event is fired when setVariable function is called. It can be called on changing a calculated value.
  * - `sender` - the survey object that fires the event.
  * - `options.name` - the variable name that has been changed.
  * - `options.value` - a new value.
  */
  onVariableChanged: EventBase<SurveyModel>;
  /*
  * The event is fired when a question visibility has been changed.
  * - `sender` - the survey object that fires the event.
  * - `options.question` - a question which visibility has been changed.
  * - `options.name` - a question name.
  * - `options.visible` - a question `visible` boolean value.
  */
  onVisibleChanged: EventBase<SurveyModel>;
  /*
  * The event is fired on changing a page visibility.
  * - `sender` - the survey object that fires the event.
  * - `options.page` - a page which visibility has been changed.
  * - `options.visible` - a page `visible` boolean value.
  */
  onPageVisibleChanged: EventBase<SurveyModel>;
  /*
  * The event is fired on changing a panel visibility.
  * - `sender` - the survey object that fires the event.
  * - `options.panel` - a panel which visibility has been changed.
  * - `options.visible` - a panel `visible` boolean value.
  */
  onPanelVisibleChanged: EventBase<SurveyModel>;
  /*
  * The event is fired on creating a new question.
  * Unlike the onQuestionAdded event, this event calls for all question created in survey including inside: a page, panel, matrix cell, dynamic panel and multiple text.
  * or inside a matrix cell or it can be a text question in multiple text items or inside a panel of a panel dynamic.
  * You can use this event to set up properties to a question based on it's type for all questions, regardless where they are located, on the page or inside a matrix cell.
  * Please note: If you want to use this event for questions loaded from JSON then you have to create survey with empty/null JSON parameter, assign the event and call survey.fromJSON(yourJSON) function.
  * - `sender` - the survey object that fires the event.
  * - `options.question` - a newly created question object.
  */
  onQuestionCreated: EventBase<SurveyModel>;
  /*
  * The event is fired on adding a new question into survey.
  * - `sender` - the survey object that fires the event.
  * - `options.question` - a newly added question object.
  * - `options.name` - a question name.
  * - `options.index` - an index of the question in the container (page or panel).
  * - `options.parentPanel` - a container where a new question is located. It can be a page or panel.
  * - `options.rootPanel` - typically, it is a page.
  */
  onQuestionAdded: EventBase<SurveyModel>;
  /*
  * The event is fired on removing a question from survey.
  * - `sender` - the survey object that fires the event.
  * - `options.question` - a removed question object.
  * - `options.name` - a question name.
  */
  onQuestionRemoved: EventBase<SurveyModel>;
  /*
  * The event is fired on adding a panel into survey.
  * - `sender` - the survey object that fires the event.
  * - `options.panel` - a newly added panel object.
  * - `options.name` - a panel name.
  * - `options.index` - an index of the panel in the container (a page or panel).
  * - `options.parentPanel` - a container (a page or panel) where a new panel is located.
  * - `options.rootPanel` - a root container, typically it is a page.
  */
  onPanelAdded: EventBase<SurveyModel>;
  /*
  * The event is fired on removing a panel from survey.
  * - `sender` - the survey object that fires the event.
  * - `options.panel` - a removed panel object.
  * - `options.name` - a panel name.
  */
  onPanelRemoved: EventBase<SurveyModel>;
  /*
  * The event is fired on adding a page into survey.
  * - `sender` - the survey object that fires the event.
  * - `options.page` - a newly added `panel` object.
  */
  onPageAdded: EventBase<SurveyModel>;
  /*
  * The event is fired on validating value in a question. You can specify a custom error message using `options.error`. The survey blocks completing the survey or going to the next page when the error messages are displayed.
  * - `sender` - the survey object that fires the event.
  * - `options.question` - a validated question.
  * - `options.name` - a question name.
  * - `options.value` - the current question value (answer).
  * - `options.error` - an error string. It is empty by default.
  */
  onValidateQuestion: EventBase<SurveyModel>;
  /*
  * The event is fired before errors are assigned to a question. You may add/remove/modify errors for a question.
  * - `sender` - the survey object that fires the event.
  * - `options.question` - a validated question.
  * - `options.errors` - the list of errors. The list is empty by default and remains empty if a validated question has no errors.
  */
  onSettingQuestionErrors: EventBase<SurveyModel>;
  /*
  * Use this event to validate data on your server.
  * - `sender` - the survey object that fires the event.
  * - `options.data` - the values of all non-empty questions on the current page. You can get a question value as `options.data["myQuestionName"]`.
  * - `options.errors` - set your errors to this object as: `options.errors["myQuestionName"] = "Error text";`. It will be shown as a question error.
  * - `options.complete()` - call this function to tell survey that your server callback has been processed.
  */
  onServerValidateQuestions: any;
  /*
  * The event is fired on validating a panel. Set your error to `options.error` and survey will show the error for the panel and block completing the survey or going to the next page.
  * - `sender` - the survey object that fires the event.
  * - `options.name` - a panel name.
  * - `options.error` - an error string. It is empty by default.
  */
  onValidatePanel: EventBase<SurveyModel>;
  /*
  * Use the event to change the default error text.
  * - `sender` - the survey object that fires the event.
  * - `options.text` - an error text.
  * - `options.error` - an instance of the `SurveyError` object.
  * - `options.obj` - an instance of Question, Panel or Survey object to where error is located.
  * - `options.name` - the error name. The following error names are available:
  * required, requireoneanswer, requirenumeric, exceedsize, webrequest, webrequestempty, otherempty,
  * uploadingfile, requiredinallrowserror, minrowcounterror, keyduplicationerror, custom
  */
  onErrorCustomText: EventBase<SurveyModel>;
  /*
  * Use the this event to be notified when the survey finished validate questions on the current page. It commonly happens when a user try to go to the next page or complete the survey
  * options.questions - the list of questions that have errors
  * options.errors - the list of errors
  * options.page - the page where question(s) are located
  */
  onValidatedErrorsOnCurrentPage: EventBase<SurveyModel>;
  /*
  * Use this event to modify the HTML content before rendering, for example `completeHtml` or `loadingHtml`.
  * - `options.html` - specifies the modified HTML content.
  */
  onProcessHtml: EventBase<SurveyModel>;
  /*
  * Use this event to change the question title in code. If you want to remove question numbering then set showQuestionNumbers to "off".
  * - `sender` - the survey object that fires the event.
  * - `options.title` - a calculated question title, based on question `title`, `name`.
  * - `options.question` - a question object.
  */
  onGetQuestionTitle: EventBase<SurveyModel>;
  /*
  * Use this event to change the element title tag name that renders by default.
  * - `sender` - the survey object that fires the event.
  * - `options.element` - an element (question, panel, page and survey) that SurveyJS is going to render.
  * - `options.tagName` - an element title tagName that are used to render a title. You can change it from the default value.
  */
  onGetTitleTagName: EventBase<SurveyModel>;
  /*
  * Use this event to change the question no in code. If you want to remove question numbering then set showQuestionNumbers to "off".
  * - `sender` - the survey object that fires the event.
  * - `options.no` - a calculated question no, based on question `visibleIndex`, survey `.questionStartIndex` properties. You can change it.
  * - `options.question` - a question object.
  */
  onGetQuestionNo: EventBase<SurveyModel>;
  /*
  * Use this event to change the progress text in code.
  * - `sender` - the survey object that fires the event.
  * - `options.text` - a progress text, that SurveyJS will render in progress bar.
  * - `options.questionCount` - a number of questions that have input(s). We do not count html or expression questions
  * - `options.answeredQuestionCount` - a number of questions that have input(s) and an user has answered.
  * - `options.requiredQuestionCount` - a number of required questions that have input(s). We do not count html or expression questions
  * - `options.requiredAnsweredQuestionCount` - a number of required questions that have input(s) and an user has answered.
  */
  onProgressText: EventBase<SurveyModel>;
  /*
  * Use this event to process the markdown text.
  * - `sender` - the survey object that fires the event.
  * - `options.element` - SurveyJS element (a question, panel, page, or survey) where the string is going to be rendered.
  * - `options.name` - a property name is going to be rendered.
  * - `options.text` - a text that is going to be rendered.
  * - `options.html` - an HTML content. It is `null` by default. Use this property to specify the HTML content rendered instead of `options.text`.
  */
  onTextMarkdown: EventBase<SurveyModel>;
  /*
  * Use this event to specity render component name used for text rendering.
  * - `sender` - the survey object that fires the event.
  * - `options.element` - SurveyJS element (a question, panel, page, or survey) where the string is going to be rendered.
  * - `options.name` - a property name is going to be rendered.
  * - `options.renderAs` - a component name used for text rendering.
  */
  onTextRenderAs: EventBase<SurveyModel>;
  /*
  * The event fires when it gets response from the [api.surveyjs.io](https://api.surveyjs.io) service on saving survey results. Use it to find out if the results have been saved successfully.
  * - `sender` - the survey object that fires the event.
  * - `options.success` - it is `true` if the results has been sent to the service successfully.
  * - `options.response` - a response from the service.
  */
  onSendResult: EventBase<SurveyModel>;
  /*
  * Use it to get results after calling the `getResult` method. It returns a simple analytics from [api.surveyjs.io](https://api.surveyjs.io) service.
  * - `sender` - the survey object that fires the event.
  * - `options.success` - it is `true` if the results were got from the service successfully.
  * - `options.data` - the object `{AnswersCount, QuestionResult : {} }`. `AnswersCount` is the number of posted survey results. `QuestionResult` is an object with all possible unique answers to the question and number of these answers.
  * - `options.dataList` - an array of objects `{name, value}`, where `name` is a unique value/answer to the question and `value` is a number/count of such answers.
  * - `options.response` - the server response.
  */
  onGetResult: EventBase<SurveyModel>;
  /*
  * The event is fired on uploading the file in QuestionFile when `storeDataAsText` is set to `false`. Use this event to change the uploaded file name or to prevent a particular file from being uploaded.
  * - `sender` - the survey object that fires the event.
  * - `options.question` - the file question instance.
  * - `options.name` - the question name.
  * - `options.files` - the Javascript File objects array to upload.
  * - `options.callback` - a callback function to get the file upload status and the updloaded file content.
  */
  onUploadFiles: EventBase<SurveyModel>;
  /*
  * The event is fired on downloading a file in QuestionFile. Use this event to pass the file to a preview.
  * - `sender` - the survey object that fires the event.
  * - `question` - the question instance.
  * - `options.name` - the question name.
  * - `options.content` - the file content.
  * - `options.fileValue` - single file question value.
  * - `options.callback` - a callback function to get the file downloading status and the downloaded file content.
  */
  onDownloadFile: EventBase<SurveyModel>;
  /*
  * This event is fired on clearing the value in a QuestionFile. Use this event to remove files stored on your server.
  * - `sender` - the survey object that fires the event.
  * - `question` - the question instance.
  * - `options.name` - the question name.
  * - `options.value` - the question value.
  * - `options.fileName` - a removed file's name, set it to `null` to clear all files.
  * - `options.callback` - a callback function to get the operation status.
  */
  onClearFiles: EventBase<SurveyModel>;
  /*
  * The event is fired after choices for radiogroup, checkbox, and dropdown has been loaded from a RESTful service and before they are assigned to a question.
  * You may change the choices, before they are assigned or disable/enabled make visible/invisible question, based on loaded results.
  * - `sender` - the survey object that fires the event.
  * - `question` - the question where loaded choices are going to be assigned.
  * - `choices` - the loaded choices. You can change the loaded choices to before they are assigned to question.
  * - `serverResult` - a result that comes from the server as it is.
  */
  onLoadChoicesFromServer: EventBase<SurveyModel>;
  /*
  * The event is fired after survey is loaded from api.surveyjs.io service.
  * You can use this event to perform manipulation with the survey model after it was loaded from the web service.
  * - `sender` - the survey object that fires the event.
  */
  onLoadedSurveyFromService: EventBase<SurveyModel>;
  /*
  * The event is fired on processing the text when it finds a text in brackets: `{somevalue}`. By default, it uses the value of survey question values and variables.
  * For example, you may use the text processing in loading choices from the web. If your `choicesByUrl.url` equals to "UrlToServiceToGetAllCities/{country}/{state}",
  * you may set on this event `options.value` to "all" or empty string when the "state" value/question is non selected by a user.
  * - `sender` - the survey object that fires the event.
  * - `options.name` - the name of the processing value, for example, "state" in our example.
  * - `options.value` - the value of the processing text.
  * - `options.isExists` - a boolean value. Set it to `true` if you want to use the value and set it to `false` if you don't.
  */
  onProcessTextValue: EventBase<SurveyModel>;
  /*
  * The event is fired before rendering a question. Use it to override the default question CSS classes.
  * - `sender` - the survey object that fires the event.
  * - `options.question` - a question for which you can change the CSS classes.
  * - `options.cssClasses` - an object with CSS classes. For example `{root: "table", button: "button"}`. You can change them to your own CSS classes.
  */
  onUpdateQuestionCssClasses: EventBase<SurveyModel>;
  /*
  * The event is fired before rendering a panel. Use it to override the default panel CSS classes.
  * - `sender` - the survey object that fires the event.
  * - `options.panel` - a panel for which you can change the CSS classes.
  * - `options.cssClasses` - an object with CSS classes. For example `{title: "sv_p_title", description: "small"}`. You can change them to your own CSS classes.
  */
  onUpdatePanelCssClasses: EventBase<SurveyModel>;
  /*
  * The event is fired before rendering a page. Use it to override the default page CSS classes.
  * - `sender` - the survey object that fires the event.
  * - `options.page` - a page for which you can change the CSS classes.
  * - `options.cssClasses` - an object with CSS classes. For example `{title: "sv_p_title", description: "small"}`. You can change them to your own CSS classes.
  */
  onUpdatePageCssClasses: EventBase<SurveyModel>;
  /*
  * The event is fired before rendering a choice item in radiogroup, checkbox or dropdown questions. Use it to override the default choice item css.
  * - `sender` - the survey object that fires the event.
  * - `options.question` - a question where choice item is rendered.
  * - `options.item` - a choice item of ItemValue type. You can get value or text choice properties as options.item.value or options.choice.text
  * - `options.css` - a string with css classes divided by space. You can change it.
  */
  onUpdateChoiceItemCss: EventBase<SurveyModel>;
  /*
  * The event is fired right after survey is rendered in DOM.
  * - `sender` - the survey object that fires the event.
  * - `options.htmlElement` - a root HTML element bound to the survey object.
  */
  onAfterRenderSurvey: EventBase<SurveyModel>;
  /*
  * The event is fired right after a page is rendered in DOM. Use it to modify HTML elements.
  * - `sender` - the survey object that fires the event.
  * - `options.htmlElement` - an HTML element bound to the survey header object.
  */
  onAfterRenderHeader: EventBase<SurveyModel>;
  /*
  * The event is fired right after a page is rendered in DOM. Use it to modify HTML elements.
  * - `sender` - the survey object that fires the event.
  * - `options.page` - a page object for which the event is fired. Typically the current/active page.
  * - `options.htmlElement` - an HTML element bound to the page object.
  */
  onAfterRenderPage: EventBase<SurveyModel>;
  /*
  * The event is fired right after a question is rendered in DOM. Use it to modify HTML elements.
  * - `sender` - the survey object that fires the event.
  * - `options.question` - a question object for which the event is fired.
  * - `options.htmlElement` - an HTML element bound to the question object.
  */
  onAfterRenderQuestion: EventBase<SurveyModel>;
  /*
  * The event is fired right after a non-composite question (text, comment, dropdown, radiogroup, checkbox) is rendered in DOM. Use it to modify HTML elements.
  * This event is not fired for matrices, panels, multiple text and image picker.
  * - `sender` - the survey object that fires the event.
  * - `options.question` - a question object for which the event is fired.
  * - `options.htmlElement` - an HTML element bound to the question object.
  */
  onAfterRenderQuestionInput: EventBase<SurveyModel>;
  /*
  * The event is fired right after a panel is rendered in DOM. Use it to modify HTML elements.
  * - `sender` - the survey object that fires the event
  * - `options.panel` - a panel object for which the event is fired
  * - `options.htmlElement` - an HTML element bound to the panel object
  */
  onAfterRenderPanel: EventBase<SurveyModel>;
  /*
  * The event occurs when an element within a question gets focus.
  * - `sender` - A [survey](https://surveyjs.io/Documentation/Library?id=surveymodel) object that fires the event.
  * - `options.question` - A [question](https://surveyjs.io/Documentation/Library?id=Question) whose child element gets focus.
  */
  onFocusInQuestion: EventBase<SurveyModel>;
  /*
  * The event occurs when an element within a panel gets focus.
  * - `sender` - A [survey](https://surveyjs.io/Documentation/Library?id=surveymodel) object that fires the event.
  * - `options.panel` - A [panel](https://surveyjs.io/Documentation/Library?id=PanelModelBase) whose child element gets focus.
  */
  onFocusInPanel: EventBase<SurveyModel>;
  /*
  * Use this event to change the visibility of an individual choice item in [Checkbox](https://surveyjs.io/Documentation/Library?id=questioncheckboxmodel), [Dropdown](https://surveyjs.io/Documentation/Library?id=questiondropdownmodel), [Radiogroup](https://surveyjs.io/Documentation/Library?id=questionradiogroupmodel), and other similar question types.
  * 
  * The event handler accepts the following arguments:
  * 
  * - `sender` - A Survey instance that raised the event.
  * - `options.question` - A Question instance to which the choice item belongs.
  * - `options.item` - The choice item as specified in the [choices](https://surveyjs.io/Documentation/Library?id=QuestionSelectBase#choices) array.
  * - `options.visible` - A Boolean value that specifies the item visibility. Set it to `false` to hide the item.
  */
  onShowingChoiceItem: EventBase<SurveyModel>;
  /*
  * The event is fired on adding a new row in Matrix Dynamic question.
  * - `sender` - the survey object that fires the event
  * - `options.question` - a matrix question.
  * - `options.row` - a new added row.
  */
  onMatrixRowAdded: EventBase<SurveyModel>;
  /*
  * The event is fired before adding a new row in Matrix Dynamic question.
  * - `sender` - the survey object that fires the event
  * - `options.question` - a matrix question.
  * - `options.canAddRow` - specifies whether a new row can be added
  */
  onMatrixBeforeRowAdded: EventBase<SurveyModel>;
  /*
  * The event is fired before removing a row from Matrix Dynamic question. You can disable removing and clear the data instead.
  * - `sender` - the survey object that fires the event
  * - `options.question` - a matrix question.
  * - `options.rowIndex` - a row index.
  * - `options.row` - a row object.
  * - `options.allow` - a boolean property. Set it to `false` to disable the row removing.
  */
  onMatrixRowRemoving: EventBase<SurveyModel>;
  /*
  * The event is fired on removing a row from Matrix Dynamic question.
  * - `sender` - the survey object that fires the event
  * - `options.question` - a matrix question
  * - `options.rowIndex` - a removed row index
  * - `options.row` - a removed row object
  */
  onMatrixRowRemoved: EventBase<SurveyModel>;
  /*
  * The event is fired before rendering "Remove" button for removing a row from Matrix Dynamic question.
  * - `sender` - the survey object that fires the event
  * - `options.question` - a matrix question.
  * - `options.rowIndex` - a row index.
  * - `options.row` - a row object.
  * - `options.allow` - a boolean property. Set it to `false` to disable the row removing.
  */
  onMatrixAllowRemoveRow: EventBase<SurveyModel>;
  /*
  * The event is fired before creating cell question in the matrix. You can change the cell question type by setting different options.cellType.
  * - `sender` - the survey object that fires the event.
  * - `options.question` - the matrix question.
  * - `options.cellType` - the cell question type. You can change it.
  * - `options.rowValue` - the value of the current row. To access a particular column's value within the current row, use: `options.rowValue["columnValue"]`.
  * - `options.column` - the matrix column object.
  * - `options.columnName` - the matrix column name.
  * - `options.row` - the matrix row object.
  */
  onMatrixCellCreating: EventBase<SurveyModel>;
  /*
  * The event is fired for every cell created in Matrix Dynamic and Matrix Dropdown questions.
  * - `sender` - the survey object that fires the event.
  * - `options.question` - the matrix question.
  * - `options.cell` - the matrix cell.
  * - `options.cellQuestion` - the question/editor in the cell. You may customize it, change it's properties, like choices or visible.
  * - `options.rowValue` - the value of the current row. To access a particular column's value within the current row, use: `options.rowValue["columnValue"]`.
  * - `options.column` - the matrix column object.
  * - `options.columnName` - the matrix column name.
  * - `options.row` - the matrix row object.
  */
  onMatrixCellCreated: EventBase<SurveyModel>;
  /*
  * The event is fired for every cell after is has been rendered in DOM.
  * - `sender` - the survey object that fires the event.
  * - `options.question` - the matrix question.
  * - `options.cell` - the matrix cell.
  * - `options.cellQuestion` - the question/editor in the cell.
  * - `options.htmlElement` - an HTML element bound to the `cellQuestion` object.
  * - `options.column` - the matrix column object.
  * - `options.row` - the matrix row object.
  */
  onMatrixAfterCellRender: EventBase<SurveyModel>;
  /*
  * The event is fired when cell value is changed in Matrix Dynamic and Matrix Dropdown questions.
  * - `sender` - the survey object that fires the event.
  * - `options.question` - the matrix question.
  * - `options.columnName` - the matrix column name.
  * - `options.value` - a new value.
  * - `options.row` - the matrix row object.
  * - `options.getCellQuestion(columnName)` - the function that returns the cell question by column name.
  */
  onMatrixCellValueChanged: EventBase<SurveyModel>;
  /*
  * The event is fired on changing cell value in Matrix Dynamic and Matrix Dropdown questions. You may change the `options.value` property to change a cell value.
  * - `sender` - the survey object that fires the event.
  * - `options.question` - the matrix question.
  * - `options.columnName` - the matrix column name.
  * - `options.value` - a new value.
  * - `options.oldValue` - the old value.
  * - `options.row` - the matrix row object.
  * - `options.getCellQuestion(columnName)` - the function that returns a cell question by column name.
  */
  onMatrixCellValueChanging: EventBase<SurveyModel>;
  /*
  * The event is fired when Matrix Dynamic and Matrix Dropdown questions validate the cell value.
  * - `sender` - the survey object that fires the event.
  * - `options.error` - an error string. It is empty by default.
  * - `options.question` - the matrix question.
  * - `options.columnName` - the matrix column name.
  * - `options.value` - a cell value.
  * - `options.row` - the matrix row object.
  * - `options.getCellQuestion(columnName)` - the function that returns the cell question by column name.
  */
  onMatrixCellValidate: EventBase<SurveyModel>;
  /*
  * The event is fired on adding a new panel in Panel Dynamic question.
  * - `sender` - the survey object that fires the event.
  * - `options.question` - a panel question.
  * - `options.panel` - an added panel.
  */
  onDynamicPanelAdded: EventBase<SurveyModel>;
  /*
  * The event is fired on removing a panel from Panel Dynamic question.
  * - `sender` - the survey object that fires the event.
  * - `options.question` - a panel question.
  * - `options.panelIndex` - a removed panel index.
  * - `options.panel` - a removed panel.
  */
  onDynamicPanelRemoved: EventBase<SurveyModel>;
  /*
  * An event that is raised before a panel is removed from a Dynamic Panel question. Use this event to cancel the removal.
  * 
  * Parameters:
  * 
  * - `sender` - A Survey instance that raised the event.
  * - `options.question` - A [Panel Dynamic](https://surveyjs.io/Documentation/Library?id=questionpaneldynamicmodel) question instance.
  * - `options.panelIndex` - The index of the removed panel.
  * - `options.panel` - The [instance of the removed panel](https://surveyjs.io/Documentation/Library?id=panelmodel).
  * - `options.allow` - A Boolean property that you should set to `false` if you want to cancel the panel removal.
  */
  onDynamicPanelRemoving: EventBase<SurveyModel>;
  /*
  * The event is fired every second if the method `startTimer` has been called.
  */
  onTimer: EventBase<SurveyModel>;
  /*
  * The event is fired before displaying a new information in the Timer Panel. Use it to change the default text.
  * - `sender` - the survey object that fires the event.
  * - `options.text` - the timer panel info text.
  */
  onTimerPanelInfoText: EventBase<SurveyModel>;
  /*
  * The event is fired when item value is changed in Panel Dynamic question.
  * - `sender` - the survey object that fires the event.
  * - `options.question` - the panel question.
  * - `options.panel` - the dynamic panel item.
  * - `options.name` - the item name.
  * - `options.value` - a new value.
  * - `options.itemIndex` - the panel item index.
  * - `options.itemValue` - the panel item object.
  */
  onDynamicPanelItemValueChanged: EventBase<SurveyModel>;
  /*
  * Use this event to define, whether an answer to a question is correct or not.
  * - `sender` - the survey object that fires the event.
  * - `options.question` - a question on which you have to decide if the answer is correct or not.
  * - `options.result` - returns `true`, if an answer is correct, or `false`, if the answer is not correct. Use questions' `value` and `correctAnswer` properties to return the correct value.
  * - `options.correctAnswers` - you may change the default number of correct or incorrect answers in the question, for example for matrix, where each row is a quiz question.
  */
  onIsAnswerCorrect: EventBase<SurveyModel>;
  /*
  * Use this event to control drag&drop operations during design mode.
  * - `sender` - the survey object that fires the event.
  * - `options.allow` - set it to `false` to disable dragging.
  * - `options.target` - a target element that is dragged.
  * - `options.source` - a source element. It can be `null`, if it is a new element, dragging from toolbox.
  * - `options.parent` - a page or panel where target element is dragging.
  * - `options.insertBefore` - an element before the target element is dragging. It can be `null` if parent container (page or panel) is empty or dragging an element after the last element in a container.
  * - `options.insertAfter` - an element after the target element is dragging. It can be `null` if parent container (page or panel) is empty or dragging element to the first position within the parent container.
  */
  onDragDropAllow: EventBase<SurveyModel>;
  /*
  * Use this event to control scrolling element to top. You can cancel the default behavior by setting options.cancel property to true.
  * - `sender` - the survey object that fires the event.
  * - `options.element` - an element that is going to be scrolled on top.
  * - `options.question` - a question that is going to be scrolled on top. It can be null if options.page is not null.
  * - `options.page` - a page that is going to be scrolled on top. It can be null if options.question is not null.
  * - `options.elementId` - the unique element DOM Id.
  * - `options.cancel` - set this property to true to cancel the default scrolling.
  */
  onScrollingElementToTop: EventBase<SurveyModel>;
  onLocaleChangedEvent: EventBase<SurveyModel>;
  /*
  * Use this event to create/customize actions to be displayed in a question's title.
  * - `sender` - A [Survey](https://surveyjs.io/Documentation/Library?id=SurveyModel) object that fires the event.
  * - `options.question` - A [Question](https://surveyjs.io/Documentation/Library?id=Question) object for which the event is fired.
  * - `options.titleActions` - A list of actions ([IAction](https://surveyjs.io/Documentation/Library?id=IAction) objects) associated with the processed question.
  */
  onGetQuestionTitleActions: EventBase<SurveyModel>;
  /*
  * Use this event to create/customize actions to be displayed in a panel's title.
  * - `sender` - A survey object that fires the event.
  * - `options.panel` - A panel ([PanelModel](https://surveyjs.io/Documentation/Library?id=panelmodel) object) for which the event is fired.
  * - `options.titleActions` - A list of actions ([IAction](https://surveyjs.io/Documentation/Library?id=IAction) objects) associated with the processed panel.
  */
  onGetPanelTitleActions: EventBase<SurveyModel>;
  /*
  * Use this event to create/customize actions to be displayed in a page's title.
  * - `sender` - A survey object that fires the event.
  * - `options.page` - A page ([PageModel](https://surveyjs.io/Documentation/Library?id=pagemodel) object) for which the event is fired.
  * - `options.titleActions` - A list of actions ([IAction](https://surveyjs.io/Documentation/Library?id=IAction) objects) associated with the processed page.
  */
  onGetPageTitleActions: EventBase<SurveyModel>;
  /*
  * Use this event to create/customize actions to be displayed in a matrix question's row.
  * - `sender` - A survey object that fires the event.
  * - `options.question` - A matrix question ([QuestionMatrixBaseModel](https://surveyjs.io/Documentation/Library?id=questionmatrixbasemodel) object) for which the event is fired.
  * - `options.row` - A matrix row for which the event is fired.
  * - `options.actions` - A list of actions ([IAction](https://surveyjs.io/Documentation/Library?id=IAction) objects) associated with the processed matrix question and row.
  */
  onGetMatrixRowActions: EventBase<SurveyModel>;
  /*
  * The event is fired after the survey element content was collapsed or expanded.
  * - `sender` - the survey object that fires the event.
  * - `options.element` - Specifies which survey element content was collapsed or expanded.
  */
  onElementContentVisibilityChanged: EventBase<SurveyModel>;
  /*
  * The event is fired before expression question convert it's value into display value for rendering.
  * - `sender` - the survey object that fires the event.
  * - `options.question` - The expression question.
  * - `options.value` - The question value.
  * - `options.displayValue` - the display value that you can change before rendering.
  */
  onGetExpressionDisplayValue: EventBase<SurveyModel>;
  /*
  * The list of errors on loading survey JSON. If the list is empty after loading a JSON, then the JSON is correct and has no errors.
  */
  jsonErrors: any;
  getType(): string;
  protected onPropertyValueChanged(name: string, oldValue: any, newValue: any): void;
  /*
  * Returns a list of all pages in the survey, including invisible pages.
  */
  get pages(): any;
  renderCallback: any;
  render(element?: any): void;
  updateSurvey(newProps: any, oldProps?: any): void;
  getCss(): any;
  cssValue: any;
  get css(): any;
  set css(val: any);
  setCss(value: any, needMerge?: boolean): void;
  get cssTitle(): string;
  get cssNavigationComplete(): string;
  get cssNavigationPreview(): string;
  get cssNavigationEdit(): string;
  get cssNavigationPrev(): string;
  get cssNavigationStart(): string;
  get cssNavigationNext(): string;
  get bodyCss(): string;
  completedCss: string;
  containerCss: string;
  get completedStateCss(): string;
  getCompletedStateCss(): string;
  lazyRenderingValue: boolean;
  showBrandInfo: boolean;
  /*
  * By default all rows are rendered no matters if they are visible or not.
  * Set it true, and survey markup rows will be rendered only if they are visible in viewport.
  * This feature is experimantal and might do not support all the use cases.
  */
  get lazyRendering(): boolean;
  set lazyRendering(val: boolean);
  get isLazyRendering(): boolean;
  /*
  * Gets or sets a list of triggers in the survey.
  */
  get triggers(): any;
  set triggers(val: any);
  /*
  * Gets or sets a list of calculated values in the survey.
  */
  get calculatedValues(): any;
  set calculatedValues(val: any);
  /*
  * Gets or sets an identifier of a survey model loaded from the [api.surveyjs.io](https://api.surveyjs.io) service. When specified, the survey JSON is automatically loaded from [api.surveyjs.io](https://api.surveyjs.io) service.
  */
  get surveyId(): string;
  set surveyId(val: string);
  /*
  * Gets or sets an identifier of a survey model saved to the [api.surveyjs.io](https://api.surveyjs.io) service. When specified, the survey data is automatically saved to the [api.surveyjs.io](https://api.surveyjs.io) service.
  */
  get surveyPostId(): string;
  set surveyPostId(val: string);
  /*
  * Gets or sets user's identifier (e.g., e-mail or unique customer id) in your web application.
  * If you load survey or post survey results from/to [api.surveyjs.io](https://api.surveyjs.io) service, then the library do not allow users to run the same survey the second time.
  * On the second run, the user will see the survey complete page.
  */
  get clientId(): string;
  set clientId(val: string);
  /*
  * Gets or sets a cookie name used to save information about completing the survey.
  * If the property is not empty, before starting the survey, the Survey library checks if the cookie with this name exists.
  * If it is `true`, the survey goes to complete mode and a user sees the survey complete page. On completing the survey the cookie with this name is created.
  */
  get cookieName(): string;
  set cookieName(val: string);
  /*
  * Gets or sets whether to save survey results on completing every page. If the property value is set to `true`, the `onPartialSend` event is fired.
  */
  get sendResultOnPageNext(): boolean;
  set sendResultOnPageNext(val: boolean);
  /*
  * Gets or sets whether to show the progress on saving/sending data into the [api.surveyjs.io](https://api.surveyjs.io) service.
  */
  get surveyShowDataSaving(): boolean;
  set surveyShowDataSaving(val: boolean);
  /*
  * Gets or sets whether the first input is focused on showing a next or a previous page.
  */
  get focusFirstQuestionAutomatic(): boolean;
  set focusFirstQuestionAutomatic(val: boolean);
  /*
  * Gets or sets whether the first input is focused if the current page has errors.
  * Set this property to `false` (the default value is `true`) if you do not want to bring the focus to the first question that has error on the page.
  */
  get focusOnFirstError(): boolean;
  set focusOnFirstError(val: boolean);
  /*
  * Gets or sets the navigation buttons position.
  * Possible values: 'bottom' (default), 'top', 'both' and 'none'. Set it to 'none' to hide 'Prev', 'Next' and 'Complete' buttons.
  * It makes sense if you are going to create a custom navigation, have only a single page, or the `goNextPageAutomatic` property is set to `true`.
  */
  get showNavigationButtons(): any;
  set showNavigationButtons(val: any);
  /*
  * Gets or sets whether the Survey displays "Prev" button in its pages. Set it to `false` to prevent end-users from going back to their answers.
  */
  get showPrevButton(): boolean;
  set showPrevButton(val: boolean);
  /*
  * Gets or sets whether the Survey displays survey title in its pages. Set it to `false` to hide a survey title.
  */
  get showTitle(): boolean;
  set showTitle(val: boolean);
  /*
  * Gets or sets whether the Survey displays page titles. Set it to `false` to hide page titles.
  */
  get showPageTitles(): boolean;
  set showPageTitles(val: boolean);
  /*
  * On finishing the survey the complete page is shown. Set the property to `false`, to hide the complete page.
  */
  get showCompletedPage(): boolean;
  set showCompletedPage(val: boolean);
  /*
  * Set this property to a url you want to navigate after a user completing the survey.
  * By default it uses after calling onComplete event. In case calling options.showDataSaving callback in onComplete event, navigateToUrl will be used on calling options.showDataSavingSuccess callback.
  */
  get navigateToUrl(): string;
  set navigateToUrl(val: string);
  /*
  * Gets or sets a list of URL condition items. If the expression of this item returns `true`, then survey will navigate to the item URL.
  */
  get navigateToUrlOnCondition(): any;
  set navigateToUrlOnCondition(val: any);
  getNavigateToUrl(): string;
  /*
  * Gets or sets the required question mark. The required question mark is a char or string that is rendered in the required questions' titles.
  */
  get requiredText(): string;
  set requiredText(val: string);
  /*
  * Gets or sets whether to hide all required errors.
  */
  hideRequiredErrors: boolean;
  beforeSettingQuestionErrors(question: IQuestion, errors: any): void;
  beforeSettingPanelErrors(question: IPanel, errors: any): void;
  /*
  * Gets or sets the first question index. The first question index is '1' by default. You may start it from '100' or from 'A', by setting '100' or 'A' to this property.
  * You can set the start index to "(1)" or "# A)" or "a)" to render question number as (1), # A) and a) accordingly.
  */
  get questionStartIndex(): string;
  set questionStartIndex(val: string);
  /*
  * Gets or sets whether the "Others" option text is stored as question comment.
  * 
  * By default the entered text in the "Others" input in the checkbox/radiogroup/dropdown is stored as `"question name " + "-Comment"`. The value itself is `"question name": "others"`.
  * Set this property to `false`, to store the entered text directly in the `"question name"` key.
  */
  get storeOthersAsComment(): boolean;
  set storeOthersAsComment(val: boolean);
  /*
  * Specifies the default maximum length for questions like text and comment, including matrix cell questions.
  * 
  * The default value is `0`, that means that the text and comment have the same max length as the standard HTML input - 524288 characters: https://www.w3schools.com/tags/att_input_maxlength.asp.
  */
  get maxTextLength(): number;
  set maxTextLength(val: number);
  /*
  * Gets or sets the default maximum length for question comments and others
  * 
  * The default value is `0`, that means that the question comments have the same max length as the standard HTML input - 524288 characters: https://www.w3schools.com/tags/att_input_maxlength.asp.
  */
  get maxOthersLength(): number;
  set maxOthersLength(val: number);
  /*
  * Gets or ses whether a user can navigate the next page automatically after answering all the questions on a page without pressing the "Next" button.
  * The available options:
  * 
  * - `true` - navigate the next page and submit survey data automatically.
  * - `autogonext` - navigate the next page automatically but do not submit survey data.
  * - `false` - do not navigate the next page and do not submit survey data automatically.
  */
  get goNextPageAutomatic(): boolean | "autogonext";
  set goNextPageAutomatic(val: boolean | "autogonext");
  /*
  * Gets or sets whether a survey is automatically completed when `goNextPageAutomatic = true`. Set it to `false` if you do not want to submit survey automatically on completing the last survey page.
  */
  get allowCompleteSurveyAutomatic(): boolean;
  set allowCompleteSurveyAutomatic(val: boolean);
  /*
  * Gets or sets a value that specifies how the survey validates the question answers.
  * 
  * The following options are available:
  * 
  * - `onNextPage` (default) - check errors on navigating to the next page or on completing the survey.
  * - `onValueChanged` - check errors on every question value (i.e., answer) changing.
  * - `onValueChanging` - check errors before setting value into survey. If there is an error, then survey data is not changed, but question value will be keeped.
  * - `onComplete` - to validate all visible questions on complete button click. If there are errors on previous pages, then the page with the first error becomes the current.
  */
  get checkErrorsMode(): string;
  set checkErrorsMode(val: string);
  /*
  * Specifies whether the text area of [comment](https://surveyjs.io/Documentation/Library?id=questioncommentmodel) questions/elements automatically expands its height to avoid the vertical scrollbar and to display the entire multi-line contents entered by respondents.
  * Default value is false.
  */
  get autoGrowComment(): boolean;
  set autoGrowComment(val: boolean);
  /*
  * Gets or sets a value that specifies how the survey updates its questions' text values.
  * 
  * The following options are available:
  * 
  * - `onBlur` (default) - the value is updated after an input loses the focus.
  * - `onTyping` - update the value of text questions, "text" and "comment", on every key press.
  * 
  * Note, that setting to "onTyping" may lead to a performance degradation, in case you have many expressions in the survey.
  */
  get textUpdateMode(): string;
  set textUpdateMode(val: string);
  /*
  * Gets or sets a value that specifies how the invisible data is included in survey data.
  * 
  * The following options are available:
  * 
  * - `none` - include the invisible values into the survey data.
  * - `onHidden` - clear the question value when it becomes invisible. If a question has value and it was invisible initially then survey clears the value on completing.
  * - `onHiddenContainer` - clear the question value when it or its parent (page or panel) becomes invisible. If a question has value and it was invisible initially then survey clears the value on completing.
  * - `onComplete` (default) - clear invisible question values on survey complete. In this case, the invisible questions will not be stored on the server.
  */
  get clearInvisibleValues(): any;
  set clearInvisibleValues(val: any);
  /*
  * Call this function to remove all question values from the survey, that end-user will not be able to enter.
  * For example the value that doesn't exists in a radiogroup/dropdown/checkbox choices or matrix rows/columns.
  * Please note, this function doesn't clear values for invisible questions or values that doesn't associated with questions.
  * In fact this function just call clearIncorrectValues function of all questions in the survey
  */
  clearIncorrectValues(removeNonExisingRootKeys?: boolean): void;
  /*
  * Gets or sets the survey locale. The default value it is empty, this means the 'en' locale is used.
  * You can set it to 'de' - German, 'fr' - French and so on. The library has built-in localization for several languages. The library has a multi-language support as well.
  */
  get locale(): string;
  set locale(val: string);
  /*
  * Returns an array of locales that are used in the survey's translation.
  */
  getUsedLocales(): Array<any>;
  localeChanged(): void;
  getLocale(): string;
  locStrsChanged(): void;
  getMarkdownHtml(text: string, name: string): string;
  getRenderer(name: string): string;
  getRendererContext(locStr: LocalizableString): LocalizableString;
  getRendererForString(element: Base, name: string): string;
  getRendererContextForString(element: Base, locStr: LocalizableString): LocalizableString;
  getExpressionDisplayValue(question: IQuestion, value: any, displayValue: string): string;
  getProcessedText(text: string): string;
  getLocString(str: string): string;
  getErrorCustomText(text: string, error: SurveyError): string;
  getSurveyErrorCustomText(obj: Base, text: string, error: SurveyError): string;
  /*
  * Returns the text that is displayed when there are no any visible pages and questiona.
  */
  get emptySurveyText(): string;
  /*
  * Gets or sets a survey logo.
  */
  get logo(): string;
  set logo(val: string);
  get locLogo(): LocalizableString;
  /*
  * Gets or sets a survey logo width.
  */
  get logoWidth(): any;
  set logoWidth(val: any);
  /*
  * Gets or sets a survey logo height.
  */
  get logoHeight(): any;
  set logoHeight(val: any);
  /*
  * Gets or sets a survey logo position.
  */
  get logoPosition(): string;
  set logoPosition(val: string);
  get hasLogo(): boolean;
  get isLogoBefore(): boolean;
  get isLogoAfter(): boolean;
  get logoClassNames(): string;
  get renderedHasTitle(): boolean;
  get renderedHasDescription(): boolean;
  get hasTitle(): boolean;
  get renderedHasLogo(): boolean;
  get renderedHasHeader(): boolean;
  /*
  * The logo fit mode.
  */
  get logoFit(): string;
  set logoFit(val: string);
  _isMobile: boolean;
  setIsMobile(newVal?: boolean): void;
  protected isLogoImageChoosen(): string;
  get titleMaxWidth(): string;
  /*
  * Gets or sets the HTML content displayed on the complete page. Use this property to change the default complete page text.
  */
  get completedHtml(): string;
  set completedHtml(val: string);
  get locCompletedHtml(): LocalizableString;
  /*
  * The list of HTML condition items. If the expression of this item returns `true`, then a survey will use this item HTML instead of `completedHtml`.
  */
  get completedHtmlOnCondition(): any;
  set completedHtmlOnCondition(val: any);
  /*
  * Calculates a given expression and returns a result value.
  */
  runExpression(expression: string): any;
  /*
  * Calculates a given expression and returns `true` or `false`.
  */
  runCondition(expression: string): boolean;
  /*
  * Run all triggers that performs on value changed and not on moving to the next page.
  */
  runTriggers(): void;
  get renderedCompletedHtml(): string;
  /*
  * The HTML content displayed to an end user that has already completed the survey.
  */
  get completedBeforeHtml(): string;
  set completedBeforeHtml(val: string);
  get locCompletedBeforeHtml(): LocalizableString;
  /*
  * The HTML that shows on loading survey Json from the [api.surveyjs.io](https://api.surveyjs.io) service.
  */
  get loadingHtml(): string;
  set loadingHtml(val: string);
  get locLoadingHtml(): LocalizableString;
  /*
  * Default value for loadingHtml property
  */
  get defaultLoadingHtml(): string;
  get navigationBar(): any;
  /*
  * Adds a custom navigation item similar to the Previous Page, Next Page, and Complete buttons.
  * Accepts an object described in the [IAction](https://surveyjs.io/Documentation/Library?id=IAction) help section.
  */
  addNavigationItem(val: IAction): Action;
  /*
  * Gets or sets the 'Start' button caption.
  * The 'Start' button is shown on the started page. Set the `firstPageIsStarted` property to `true`, to display the started page.
  */
  get startSurveyText(): string;
  set startSurveyText(val: string);
  get locStartSurveyText(): LocalizableString;
  /*
  * Gets or sets the 'Prev' button caption.
  */
  get pagePrevText(): string;
  set pagePrevText(val: string);
  get locPagePrevText(): LocalizableString;
  /*
  * Gets or sets the 'Next' button caption.
  */
  get pageNextText(): string;
  set pageNextText(val: string);
  get locPageNextText(): LocalizableString;
  /*
  * Gets or sets the 'Complete' button caption.
  */
  get completeText(): string;
  set completeText(val: string);
  get locCompleteText(): LocalizableString;
  /*
  * Gets or sets the 'Preview' button caption.
  */
  get previewText(): string;
  set previewText(val: string);
  get locPreviewText(): LocalizableString;
  /*
  * Gets or sets the 'Edit' button caption.
  */
  get editText(): string;
  set editText(val: string);
  get locEditText(): LocalizableString;
  getElementTitleTagName(element: Base, tagName: string): string;
  /*
  * Set the pattern for question title. Default is "numTitleRequire", 1. What is your name? *,
  * You can set it to numRequireTitle: 1. * What is your name?
  * You can set it to requireNumTitle: * 1. What is your name?
  * You can set it to numTitle (remove require symbol completely): 1. What is your name?
  */
  get questionTitlePattern(): string;
  set questionTitlePattern(val: string);
  getQuestionTitlePatternOptions(): Array<any>;
  /*
  * Gets or sets a question title template. Obsolete, please use questionTitlePattern
  */
  get questionTitleTemplate(): string;
  set questionTitleTemplate(val: string);
  get locQuestionTitleTemplate(): LocalizableString;
  getUpdatedQuestionTitle(question: IQuestion, title: string): string;
  getUpdatedQuestionNo(question: IQuestion, no: string): string;
  /*
  * Gets or sets whether the survey displays page numbers on pages titles.
  */
  get showPageNumbers(): boolean;
  set showPageNumbers(val: boolean);
  /*
  * Gets or sets a value that specifies how the question numbers are displayed.
  * 
  * The following options are available:
  * 
  * - `on` - display question numbers
  * - `onpage` - display question numbers, start numbering on every page
  * - `off` - turn off the numbering for questions titles
  */
  get showQuestionNumbers(): string;
  set showQuestionNumbers(val: string);
  /*
  * Gets or sets the survey progress bar position.
  * 
  * The following options are available:
  * 
  * - `off` (default) - don't show progress bar
  * - `top` - show progress bar in the top
  * - `bottom` - show progress bar in the bottom
  * - `both` - show progress bar in both sides: top and bottom.
  */
  get showProgressBar(): string;
  set showProgressBar(val: string);
  /*
  * Gets or sets the type of info in the progress bar.
  * 
  * The following options are available:
  * 
  * - `pages` (default),
  * - `questions`,
  * - `requiredQuestions`,
  * - `correctQuestions`,
  * - `buttons`
  */
  get progressBarType(): string;
  set progressBarType(val: string);
  get isShowProgressBarOnTop(): boolean;
  get isShowProgressBarOnBottom(): boolean;
  /*
  * Returns the text/HTML that is rendered as a survey title.
  */
  get processedTitle(): string;
  /*
  * Gets or sets the question title location.
  * 
  * The following options are available:
  * 
  * - `bottom` - show a question title to bottom
  * - `left` - show a question title to left
  * - `top` - show a question title to top.
  * 
  * > Some questions, for example matrixes, do not support 'left' value. The title for them will be displayed to the top.
  */
  get questionTitleLocation(): string;
  set questionTitleLocation(val: string);
  updateElementCss(reNew?: boolean): void;
  /*
  * Gets or sets the error message position.
  * 
  * The following options are available:
  * 
  * - `top` - to show question error(s) over the question,
  * - `bottom` - to show question error(s) under the question.
  */
  get questionErrorLocation(): string;
  set questionErrorLocation(val: string);
  /*
  * Gets or sets the question description position. The default value is `underTitle`.
  * 
  * The following options are available:
  * 
  * - `underTitle` - show question description under the question title,
  * - `underInput` - show question description under the question input instead of question title.
  */
  get questionDescriptionLocation(): string;
  set questionDescriptionLocation(val: string);
  /*
  * Gets or sets the survey edit mode.
  * 
  * The following options are available:
  * 
  * - `edit` (default) - make a survey editable,
  * - `display` - make a survey read-only.
  */
  get mode(): string;
  set mode(val: string);
  /*
  * Gets or sets an object that stores the survey results/data. You can set it directly as `{ 'question name': questionValue, ... }`
  * 
  * > If you set the `data` property after creating the survey, you may need to set the `currentPageNo` to `0`, if you are using `visibleIf` properties for questions/pages/panels to ensure that you are starting from the first page.
  */
  get data(): any;
  set data(val: any);
  /*
  * Merge the values into survey.data. It works as survey.data, except it doesn't clean the existing data, but overrides them.
  */
  mergeData(data: any): void;
  setDataCore(data: any): void;
  onEditingObjPropertyChanged: (sender: Base, options: any) => void;
  get editingObj(): Base;
  set editingObj(val: Base);
  get isEditingSurveyElement(): boolean;
  getAllValues(): any;
  /*
  * Returns survey result data as an array of plain objects: with question `title`, `name`, `value`, and `displayValue`.
  * 
  * For complex questions (like matrix, etc.) `isNode` flag is set to `true` and data contains array of nested objects (rows).
  * 
  * Set `options.includeEmpty` to `false` if you want to skip empty answers.
  */
  getPlainData(options?: any): any;
  getFilteredValues(): any;
  getFilteredProperties(): any;
  getDataValueCore(valuesHash: any, key: string): any;
  setDataValueCore(valuesHash: any, key: string, value: any): void;
  deleteDataValueCore(valuesHash: any, key: string): void;
  valueHashGetDataCallback: (valuesHash: any, key: string) => any;
  valueHashSetDataCallback: (valuesHash: any, key: string, value: any) => void;
  valueHashDeleteDataCallback: (valuesHash: any, key: string) => void;
  /*
  * Returns all comments from the data.
  */
  get comments(): any;
  /*
  * Returns a list of visible pages. If all pages are visible, then this property returns the same list as the `pages` property.
  */
  get visiblePages(): any;
  /*
  * Returns `true` if the survey contains no pages. The survey is empty.
  */
  get isEmpty(): boolean;
  /*
  * Deprecated. Use the `pageCount` property instead.
  */
  get PageCount(): number;
  /*
  * Returns the survey page count.
  */
  get pageCount(): number;
  /*
  * Returns a number of visible pages within the survey.
  */
  get visiblePageCount(): number;
  /*
  * Returns the started page. This property works if the `firstPageIsStarted` property is set to `true`.
  */
  get startedPage(): PageModel;
  /*
  * Gets or sets the current survey page. If a survey is rendered, then this property returns a page that a user can see/edit.
  */
  get currentPage(): any;
  set currentPage(val: any);
  /*
  * Returns the currentPage, unless the started page is showing. In this case returns the started page.
  */
  get activePage(): any;
  /*
  * The started page is showing right now. survey state equals to "starting"
  */
  get isShowStartingPage(): boolean;
  /*
  * Survey is showing a page right now. It is in "running", "preview" or starting state.
  */
  get isShowingPage(): boolean;
  /*
  * The zero-based index of the current page in the visible pages array.
  */
  get currentPageNo(): number;
  set currentPageNo(val: number);
  /*
  * Gets or sets the question display order. Use this property to randomize questions. You can randomize questions on a specific page.
  * 
  * The following options are available:
  * 
  * - `random` - randomize questions
  * - `initial` - keep questions in the same order, as in a survey model.
  */
  get questionsOrder(): string;
  set questionsOrder(val: string);
  /*
  * Sets the input focus to the first question with the input field.
  */
  focusFirstQuestion(): void;
  scrollToTopOnPageChange(doScroll?: boolean): void;
  /*
  * Returns the current survey state:
  * 
  * - `loading` - the survey is being loaded from JSON,
  * - `empty` - there is nothing to display in the current survey,
  * - `starting` - the survey's start page is displayed,
  * - `running` - a respondent is answering survey questions right now,
  * - `preview` - a respondent is previewing answered questions before submitting the survey (see [example](https://surveyjs.io/Examples/Library?id=survey-showpreview)),
  * - `completed` - a respondent has completed the survey and submitted the results.
  * 
  * Details: [Preview State](https://surveyjs.io/Documentation/Library#states)
  */
  get state(): string;
  get completedState(): string;
  get completedStateText(): string;
  protected setCompletedState(value: string, text: string): void;
  /*
  * Clears the survey data and state. If the survey has a `completed` state, it will get a `running` state.
  */
  clear(clearData?: boolean, gotoFirstPage?: boolean): void;
  mergeValues(src: any, dest: any): void;
  protected updateCustomWidgets(page: PageModel): void;
  protected currentPageChanging(newValue: PageModel, oldValue: PageModel): boolean;
  protected currentPageChanged(newValue: PageModel, oldValue: PageModel): void;
  /*
  * Returns the progress that a user made while going through the survey.
  * It depends from progressBarType property
  */
  getProgress(): number;
  /*
  * Returns the progress that a user made while going through the survey.
  * It depends from progressBarType property
  */
  get progressValue(): number;
  /*
  * Returns the navigation buttons (i.e., 'Prev', 'Next', or 'Complete' and 'Preview') position.
  */
  get isNavigationButtonsShowing(): string;
  /*
  * Returns true if the navigation buttons (i.e., 'Prev', 'Next', or 'Complete' and 'Preview') are shows on top.
  */
  get isNavigationButtonsShowingOnTop(): boolean;
  /*
  * Returns true if the navigation buttons (i.e., 'Prev', 'Next', or 'Complete' and 'Preview') are shows on bottom.
  */
  get isNavigationButtonsShowingOnBottom(): boolean;
  /*
  * Returns `true` if the survey is in edit mode.
  */
  get isEditMode(): boolean;
  /*
  * Returns `true` if the survey is in display mode or in preview mode.
  */
  get isDisplayMode(): boolean;
  get isUpdateValueTextOnTyping(): boolean;
  /*
  * Returns `true` if the survey is in design mode. It is used by SurveyJS Editor.
  */
  get isDesignMode(): boolean;
  _isDesignMode: boolean;
  /*
  * Sets the survey into design mode.
  */
  setDesignMode(value: boolean): void;
  /*
  * Gets or sets whether to show all elements in the survey, regardless their visibility. The default value is `false`.
  */
  get showInvisibleElements(): boolean;
  set showInvisibleElements(val: boolean);
  get areInvisibleElementsShowing(): boolean;
  get areEmptyElementsHidden(): boolean;
  /*
  * Returns `true`, if a user has already completed the survey in this browser and there is a cookie about it. Survey goes to `completed` state if the function returns `true`.
  */
  get hasCookie(): boolean;
  /*
  * Set the cookie with `cookieName` in user's browser. It is done automatically on survey complete if the `cookieName` property value is not empty.
  */
  setCookie(): void;
  /*
  * Deletes the cookie with `cookieName` from the browser.
  */
  deleteCookie(): void;
  /*
  * Gets or sets whether the survey must ignore validation like required questions and others, on `nextPage` and `completeLastPage` function calls. The default is `false`.
  */
  ignoreValidation: boolean;
  /*
  * Navigates user to the next page.
  * 
  * Returns `false` in the following cases:
  * 
  * - if the current page is the last page.
  * - if the current page contains errors (for example, a required question is empty).
  */
  nextPage(): boolean;
  asyncValidationQuesitons: any;
  /*
  * Returns `true`, if the current page contains errors, for example, the required question is empty or a question validation is failed.
  */
  get isCurrentPageHasErrors(): boolean;
  /*
  * Returns `true`, if the current page contains any error. If there is an async function in an expression, then the function will return `undefined` value.
  * In this case, you should use `onAsyncValidation` parameter, which is a callback function: (hasErrors: boolean) => void
  */
  hasCurrentPageErrors(onAsyncValidation?: (hasErrors: boolean) => void): boolean;
  /*
  * Returns `true`, if a page contains an error. If there is an async function in an expression, then the function will return `undefined` value.
  * In this case, you should use the second `onAsyncValidation` parameter,  which is a callback function: (hasErrors: boolean) => void
  */
  hasPageErrors(page?: PageModel, onAsyncValidation?: (hasErrors: boolean) => void): boolean;
  /*
  * Returns `true`, if any of the survey pages contains errors. If there is an async function in an expression, then the function will return `undefined` value.
  * In this case, you should use  the third `onAsyncValidation` parameter, which is a callback function: (hasErrors: boolean) => void
  */
  hasErrors(fireCallback?: boolean, focusOnFirstError?: boolean, onAsyncValidation?: (hasErrors: boolean) => void): boolean;
  /*
  * Checks whether survey elements (pages, panels, and questions) have unique question names.
  * You can check for unique names for individual page and panel (and all their elements) or a question.
  * If the parameter is not specified, then a survey checks that all its elements have unique names.
  */
  ensureUniqueNames(element?: ISurveyElement): void;
  /*
  * Navigates user to a previous page. If the current page is the first page, `prevPage` returns `false`. `prevPage` does not perform any checks, required questions can be empty.
  */
  prevPage(): boolean;
  /*
  * Completes the survey, if the current page is the last one. It returns `false` if the last page has errors.
  * If the last page has no errors, `completeLastPage` calls `doComplete` and returns `true`.
  */
  completeLastPage(): boolean;
  isNavigationButtonPressed: boolean;
  navigationMouseDown(): boolean;
  mouseDownPage: any;
  nextPageUIClick(): void;
  nextPageMouseDown(): boolean;
  /*
  * Shows preview for the survey. Switches the survey to the "preview" state.
  * 
  * Details: [Preview State](https://surveyjs.io/Documentation/Library#states-preview)
  */
  showPreview(): boolean;
  /*
  * Cancels preview and switches back to the "running" state.
  * 
  * Details: [Preview State](https://surveyjs.io/Documentation/Library#states-preview)
  */
  cancelPreview(curPage?: any): void;
  cancelPreviewByPage(panel: IPanel): any;
  protected doCurrentPageComplete(doComplete: boolean): boolean;
  /*
  * Obsolete. Use the `questionsOnPageMode` property instead.
  */
  get isSinglePage(): boolean;
  set isSinglePage(val: boolean);
  /*
  * Gets or sets a value that specifies how the survey combines questions, panels, and pages.
  * 
  * The following options are available:
  * 
  * - `singlePage` - combine all survey pages in a single page. Pages will be converted to panels.
  * - `questionPerPage` - show one question per page. Survey will create a separate page for every question.
  */
  get questionsOnPageMode(): string;
  set questionsOnPageMode(val: string);
  /*
  * Gets or sets whether the first survey page is a start page. Set this property to `true`, to make the first page a starting page.
  * An end user cannot navigate to the start page and the start page does not affect a survey progress.
  */
  get firstPageIsStarted(): boolean;
  set firstPageIsStarted(val: boolean);
  isPageStarted(page: IPage): boolean;
  /*
  * Set this property to "showAllQuestions" or "showAnsweredQuestions" to allow respondents to preview answers before submitting the survey results.
  * 
  * Details: [Preview State](https://surveyjs.io/Documentation/Library#states-preview)
  * Example: [Show Preview Before Complete](https://surveyjs.io/Examples/Library?id=survey-showpreview)
  */
  get showPreviewBeforeComplete(): string;
  set showPreviewBeforeComplete(val: string);
  get isShowPreviewBeforeComplete(): boolean;
  protected onFirstPageIsStartedChanged(): void;
  runningPages: any;
  origionalPages: any;
  protected onQuestionsOnPageModeChanged(oldValue: string): void;
  /*
  * Gets whether the current page is the first one.
  */
  get isFirstPage(): boolean;
  /*
  * Gets whether the current page is the last one.
  */
  get isLastPage(): boolean;
  get isShowPrevButton(): boolean;
  get isShowNextButton(): boolean;
  get isCompleteButtonVisible(): boolean;
  get isPreviewButtonVisible(): boolean;
  get isCancelPreviewButtonVisible(): boolean;
  calcIsCompleteButtonVisible(): boolean;
  /*
  * Completes the survey.
  * 
  * Calling this function performs the following tasks:
  * 
  * - writes cookie if the `cookieName` property is not empty
  * - sets the survey into `completed` state
  * - fires the `onComplete` event
  * - calls `sendResult` function.
  * 
  * Calling the `doComplete` function does not perform any validation, unlike the `completeLastPage` function.
  * The function can return false, if you set options.allowComplete to false in onCompleting event. Otherwise it returns true.
  * It calls `navigateToUrl` after calling `onComplete` event.
  * In case calling `options.showDataSaving` callback in the `onComplete` event, `navigateToUrl` is used on calling `options.showDataSavingSuccess` callback.
  */
  doComplete(isCompleteOnTrigger?: boolean): boolean;
  /*
  * Starts the survey. Changes the survey mode from "starting" to "running". Call this function if your survey has a start page, otherwise this function does nothing.
  */
  start(): boolean;
  /*
  * Gets whether the question values on the current page are validating on the server at the current moment.
  */
  get isValidatingOnServer(): boolean;
  serverValidationEventCount: number;
  protected onIsValidatingOnServerChanged(): void;
  protected doServerValidation(doComplete: boolean, isPreview?: boolean): boolean;
  protected doNextPage(): void;
  setCompleted(): void;
  canBeCompleted(): void;
  /*
  * Returns the HTML content for the complete page.
  */
  get processedCompletedHtml(): string;
  /*
  * Returns the HTML content, that is shown to a user that had completed the survey before.
  */
  get processedCompletedBeforeHtml(): string;
  /*
  * Returns the HTML content, that is shows when a survey loads the survey JSON.
  */
  get processedLoadingHtml(): string;
  getProgressInfo(): IProgressInfo;
  /*
  * Returns the text for the current progress.
  */
  get progressText(): string;
  isCalculatingProgressText: boolean;
  updateProgressText(onValueChanged?: boolean): void;
  getProgressText(): string;
  rootCss: string;
  getRootCss(): string;
  resizeObserver: any;
  afterRenderSurvey(htmlElement: any): void;
  updateQuestionCssClasses(question: IQuestion, cssClasses: any): void;
  updatePanelCssClasses(panel: IPanel, cssClasses: any): void;
  updatePageCssClasses(page: IPage, cssClasses: any): void;
  updateChoiceItemCss(question: IQuestion, options: any): void;
  isFirstPageRendering: boolean;
  isCurrentPageRendering: boolean;
  afterRenderPage(htmlElement: any): void;
  afterRenderHeader(htmlElement: any): void;
  afterRenderQuestion(question: IQuestion, htmlElement: any): void;
  afterRenderQuestionInput(question: IQuestion, htmlElement: any): void;
  afterRenderPanel(panel: IElement, htmlElement: any): void;
  whenQuestionFocusIn(question: IQuestion): void;
  whenPanelFocusIn(panel: IPanel): void;
  canChangeChoiceItemsVisibility(): boolean;
  getChoiceItemVisibility(question: IQuestion, item: any, val: boolean): boolean;
  matrixBeforeRowAdded(options: any): void;
  matrixRowAdded(question: IQuestion, row: any): void;
  getQuestionByValueNameFromArray(valueName: string, name: string, index: number): IQuestion;
  matrixRowRemoved(question: IQuestion, rowIndex: number, row: any): void;
  matrixRowRemoving(question: IQuestion, rowIndex: number, row: any): boolean;
  matrixAllowRemoveRow(question: IQuestion, rowIndex: number, row: any): boolean;
  matrixCellCreating(question: IQuestion, options: any): void;
  matrixCellCreated(question: IQuestion, options: any): void;
  matrixAfterCellRender(question: IQuestion, options: any): void;
  matrixCellValueChanged(question: IQuestion, options: any): void;
  matrixCellValueChanging(question: IQuestion, options: any): void;
  get isValidateOnValueChanging(): boolean;
  get isValidateOnValueChanged(): boolean;
  matrixCellValidate(question: IQuestion, options: any): SurveyError;
  dynamicPanelAdded(question: IQuestion, panelIndex?: number, panel?: IPanel): void;
  dynamicPanelRemoved(question: IQuestion, panelIndex: number, panel: IPanel): void;
  dynamicPanelRemoving(question: IQuestion, panelIndex: number, panel: IPanel): boolean;
  dynamicPanelItemValueChanged(question: IQuestion, options: any): void;
  dragAndDropAllow(options: any): boolean;
  elementContentVisibilityChanged(element: ISurveyElement): void;
  getUpdatedElementTitleActions(element: ISurveyElement, titleActions: any): Array<IAction>;
  getUpdatedMatrixRowActions(question: IQuestion, row: any, actions: any): any;
  scrollElementToTop(element: ISurveyElement, question: IQuestion, page: IPage, id: string): any;
  /*
  * Uploads a file to server.
  */
  uploadFiles(question: IQuestion, name: string, files: any, uploadingCallback: (status: string, data: any) => any): void;
  /*
  * Downloads a file from server
  */
  downloadFile(question: IQuestion, questionName: string, fileValue: any, callback: (status: string, data: any) => any): void;
  /*
  * Clears files from server.
  */
  clearFiles(question: IQuestion, name: string, value: any, fileName: string, callback: (status: string, data: any) => any): void;
  updateChoicesFromServer(question: IQuestion, choices: any, serverResult: any): Array<ItemValue>;
  loadedChoicesFromServer(question: IQuestion): void;
  protected createSurveyService(): dxSurveyService;
  protected uploadFilesCore(name: string, files: any, uploadingCallback: (status: string, data: any) => any): void;
  getPage(index: number): PageModel;
  /*
  * Adds an existing page to the survey.
  */
  addPage(page: PageModel, index?: number): void;
  /*
  * Creates a new page and adds it to a survey. Generates a new name if the `name` parameter is not specified.
  */
  addNewPage(name?: string, index?: number): PageModel;
  /*
  * Removes a page from a survey.
  */
  removePage(page: PageModel): void;
  /*
  * Returns a question by its name.
  */
  getQuestionByName(name: string, caseInsensitive?: boolean): Question;
  /*
  * Returns a question by its value name
  */
  getQuestionByValueName(valueName: string, caseInsensitive?: boolean): IQuestion;
  /*
  * Returns all questions by their valueName. name property is used if valueName property is empty.
  */
  getQuestionsByValueName(valueName: string, caseInsensitive?: boolean): Array<Question>;
  getCalculatedValueByName(name: string): CalculatedValue;
  /*
  * Gets a list of questions by their names.
  */
  getQuestionsByNames(names: any, caseInsensitive?: boolean): Array<IQuestion>;
  /*
  * Returns a page on which an element (question or panel) is placed.
  */
  getPageByElement(element: IElement): PageModel;
  /*
  * Returns a page on which a question is located.
  */
  getPageByQuestion(question: IQuestion): PageModel;
  /*
  * Returns a page by it's name.
  */
  getPageByName(name: string): PageModel;
  /*
  * Returns a list of pages by their names.
  */
  getPagesByNames(names: any): Array<PageModel>;
  /*
  * Returns a list of all questions in a survey.
  */
  getAllQuestions(visibleOnly?: boolean, includingDesignTime?: boolean): Array<Question>;
  /*
  * Returns quiz questions. All visible questions that has input(s) widgets.
  */
  getQuizQuestions(): Array<IQuestion>;
  /*
  * Returns a panel by its name.
  */
  getPanelByName(name: string, caseInsensitive?: boolean): PanelModel;
  /*
  * Returns a list of all survey's panels.
  */
  getAllPanels(visibleOnly?: boolean, includingDesignTime?: boolean): Array<IPanel>;
  /*
  * Creates and returns a new page, but do not add it into the survey.
  * You can use addPage(page) function to add it into survey later.
  */
  createNewPage(name: string): PageModel;
  protected questionOnValueChanging(valueName: string, newValue: any): any;
  protected updateQuestionValue(valueName: string, newValue: any): void;
  protected notifyQuestionOnValueChanged(valueName: string, newValue: any): void;
  isRunningElementsBindings: boolean;
  updateVisibleIndexAfterBindings: boolean;
  isTriggerIsRunning: boolean;
  triggerValues: any;
  triggerKeys: any;
  conditionValues: any;
  isValueChangedOnRunningCondition: boolean;
  conditionRunnerCounter: number;
  conditionUpdateVisibleIndexes: boolean;
  conditionNotifyElementsOnAnyValueOrVariableChanged: boolean;
  /*
  * Sends a survey result to the [api.surveyjs.io](https://api.surveyjs.io) service.
  */
  sendResult(postId?: string, clientId?: string, isPartialCompleted?: boolean): void;
  /*
  * Calls the [api.surveyjs.io](https://api.surveyjs.io) service and, on callback, fires the `onGetResult` event with all answers that your users made for a question.
  */
  getResult(resultId: string, name: string): void;
  /*
  * Loads the survey JSON from the [api.surveyjs.io](https://api.surveyjs.io) service.
  * If `clientId` is not `null` and a user had completed a survey before, the survey switches to `completedbefore` state.
  */
  loadSurveyFromService(surveyId?: string, cliendId?: string): void;
  protected onLoadingSurveyFromService(): void;
  protected onLoadSurveyFromService(): void;
  fromJSON(json: any): void;
  setJsonObject(jsonObj: any): void;
  isEndLoadingFromJson: string;
  endLoadingFromJson(): void;
  updateNavigationItemCssCallback: (strName?: string) => void;
  protected createNavigationBar(): ActionContainer;
  protected createNavigationActions(): Array<IAction>;
  protected onBeforeCreating(): void;
  protected onCreating(): void;
  getBuiltInVariableValue(name: string): number;
  hasVisibleQuestionByValueName(valueName: string): boolean;
  questionCountByValueName(valueName: string): number;
  /*
  * Returns a variable value. Variable, unlike values, are not stored in the survey results.
  */
  getVariable(name: string): any;
  /*
  * Sets a variable value. Variable, unlike values, are not stored in the survey results.
  */
  setVariable(name: string, newValue: any): void;
  /*
  * Returns all variables in the survey. Use setVariable function to create a new variable.
  */
  getVariableNames(): Array<any>;
  protected getUnbindValue(value: any): any;
  /*
  * Returns a question value (answer) by a question's name.
  */
  getValue(name: string): any;
  /*
  * Sets a question value (answer). It runs all triggers and conditions (`visibleIf` properties).
  * 
  * Goes to the next page if `goNextPageAutomatic` is `true` and all questions on the current page are answered correctly.
  */
  setValue(name: string, newQuestionValue: any, locNotification?: any, allowNotifyValueChanged?: boolean): void;
  protected doOnPageAdded(page: PageModel): void;
  protected doOnPageRemoved(page: PageModel): void;
  protected tryGoNextPageAutomatic(name: string): void;
  /*
  * Returns the comment value.
  */
  getComment(name: string): string;
  /*
  * Sets a comment value.
  */
  setComment(name: string, newValue: string, locNotification?: any): void;
  /*
  * Removes a value from the survey results.
  */
  clearValue(name: string): void;
  /*
  * Gets or sets whether to clear value on disable items in checkbox, dropdown and radiogroup questions.
  * By default, values are not cleared on disabled the corresponded items. This property is not persisted in survey JSON and you have to set it in code.
  */
  get clearValueOnDisableItems(): boolean;
  set clearValueOnDisableItems(val: boolean);
  get isClearValueOnHidden(): boolean;
  get isClearValueOnHiddenContainer(): boolean;
  questionVisibilityChanged(question: IQuestion, newValue: boolean): void;
  pageVisibilityChanged(page: IPage, newValue: boolean): void;
  panelVisibilityChanged(panel: IPanel, newValue: boolean): void;
  questionCreated(question: IQuestion): any;
  questionAdded(question: IQuestion, index: number, parentPanel: any, rootPanel: any): void;
  questionRemoved(question: IQuestion): void;
  questionRenamed(question: IQuestion, oldName: string, oldValueName: string): any;
  questionHashes: any;
  panelAdded(panel: IElement, index: number, parentPanel: any, rootPanel: any): void;
  panelRemoved(panel: IElement): void;
  validateQuestion(question: IQuestion): SurveyError;
  validatePanel(panel: IPanel): SurveyError;
  processHtml(html: string): string;
  processText(text: string, returnDisplayValue: boolean): string;
  processTextEx(text: string, returnDisplayValue: boolean, doEncoding: boolean): any;
  getSurveyMarkdownHtml(element: Base, text: string, name: string): string;
  /*
  * Deprecated. Use the getCorrectAnswerCount method instead.
  */
  getCorrectedAnswerCount(): number;
  /*
  * Returns an amount of corrected quiz answers.
  */
  getCorrectAnswerCount(): number;
  /*
  * Returns quiz question number. It may be different from `getQuizQuestions.length` because some widgets like matrix may have several questions.
  */
  getQuizQuestionCount(): number;
  /*
  * Deprecated. Use the getInCorrectAnswerCount method instead.
  */
  getInCorrectedAnswerCount(): number;
  /*
  * Returns an amount of incorrect quiz answers.
  */
  getInCorrectAnswerCount(): number;
  getCorrectedAnswers(): number;
  getInCorrectedAnswers(): number;
  /*
  * Gets or sets a timer panel position. The timer panel displays information about how much time an end user spends on a survey/page.
  * 
  * The available options:
  * - `top` - display timer panel in the top.
  * - `bottom` - display timer panel in the bottom.
  * - `none` - do not display a timer panel.
  * 
  * If the value is not equal to 'none', the survey calls the `startTimer()` method on survey rendering.
  */
  get showTimerPanel(): string;
  set showTimerPanel(val: string);
  get isTimerPanelShowingOnTop(): boolean;
  get isTimerPanelShowingOnBottom(): boolean;
  /*
  * Gets or set a value that specifies whether the timer displays information for the page or for the entire survey.
  * 
  * The available options:
  * 
  * - `page` - show timer information for page
  * - `survey` - show timer information for survey
  * 
  * Use the `onTimerPanelInfoText` event to change the default text.
  */
  get showTimerPanelMode(): string;
  set showTimerPanelMode(val: string);
  /*
  * Gets or sets a value that specifies how the survey width is calculated.
  * 
  * The available options:
  * 
  * - `static` - A survey has a fixed width that mostly depends upon the applied theme. Resizing a browser window does not affect the survey width.
  * - `responsive` - A survey takes all available horizontal space. A survey stretches or shrinks horizonally according to the screen size.
  * - `auto` - Depends on the question type and corresponds to the static or responsive mode.
  */
  get widthMode(): string;
  set widthMode(val: string);
  calculatedWidthMode: string;
  calculateWidthMode(): string;
  /*
  * A survey width in CSS values.
  * 
  * Default value: `undefined` (the survey inherits the width from its container)
  */
  get width(): string;
  set width(val: string);
  get timerInfoText(): string;
  get timerModel(): SurveyTimerModel;
  /*
  * Starts a timer that will calculate how much time end-user spends on the survey or on pages.
  */
  startTimer(): void;
  startTimerFromUI(): void;
  /*
  * Stops the timer.
  */
  stopTimer(): void;
  /*
  * Returns the time in seconds an end user spends on the survey
  */
  get timeSpent(): number;
  /*
  * Gets or sets the maximum time in seconds that end user has to complete a survey. If the value is 0 or less, an end user has no time limit to finish a survey.
  */
  get maxTimeToFinish(): number;
  set maxTimeToFinish(val: number);
  /*
  * Gets or sets the maximum time in seconds that end user has to complete a page in the survey. If the value is 0 or less, an end user has no time limit.
  * 
  * You may override this value for every page.
  */
  get maxTimeToFinishPage(): number;
  set maxTimeToFinishPage(val: number);
  get inSurvey(): boolean;
  getSurveyData(): ISurveyData;
  getSurvey(): ISurvey;
  getTextProcessor(): ITextProcessor;
  getObjects(pages: any, questions: any): Array<any>;
  setTriggerValue(name: string, value: any, isVariable: boolean): void;
  copyTriggerValue(name: string, fromName: string): void;
  triggerExecuted(trigger: Trigger): void;
  isFocusingQuestion: boolean;
  isMovingQuestion: boolean;
  startMovingQuestion(): void;
  stopMovingQuestion(): void;
  needRenderIcons: boolean;
  /*
  * Focus question by its name. If needed change the current page on the page where question is located.
  * Function returns false if there is no question with this name or question is invisible, otherwise it returns true.
  */
  focusQuestion(name: string): boolean;
  getElementWrapperComponentName(element: any, reason?: string): string;
  getQuestionContentWrapperComponentName(element: any): string;
  getRowWrapperComponentName(row: QuestionRowModel): string;
  getElementWrapperComponentData(element: any, reason?: string): any;
  getRowWrapperComponentData(row: QuestionRowModel): any;
  getItemValueWrapperComponentName(item: ItemValue, question: QuestionSelectBase): string;
  getItemValueWrapperComponentData(item: ItemValue, question: QuestionSelectBase): any;
  getMatrixCellTemplateData(cell: any): any;
  searchText(text: string): Array<IFindElement>;
  skeletonComponentName: string;
  getSkeletonComponentName(element: ISurveyElement): string;
  /*
  * Use this method to dispose survey model properly.
  */
  dispose(): void;
  disposeCallback: any;
}
/*
* It extends the Trigger base class and add properties required for SurveyJS classes.
*/
export declare class SurveyTrigger extends Trigger {
  constructor();
  protected ownerValue: ISurveyTriggerOwner;
  get owner(): ISurveyTriggerOwner;
  setOwner(owner: ISurveyTriggerOwner): void;
  getSurvey(live?: boolean): ISurvey;
  protected isRealExecution(): boolean;
  protected onSuccessExecuted(): void;
}
/*
* Obsolete. Please use PopupSurvey
*/
export declare class SurveyWindowModel extends PopupSurveyModel {
  constructor(jsonObj: any, initialModel?: SurveyModel);
}
/*
* Validate text values.
*/
export declare class TextValidator extends SurveyValidator {
  constructor();
  getType(): string;
  validate(value: any, name?: string, values?: any, properties?: any): ValidatorResult;
  protected getDefaultErrorText(name: string): string;
  /*
  * The minLength property.
  */
  get minLength(): number;
  set minLength(val: number);
  /*
  * The maxLength property.
  */
  get maxLength(): number;
  set maxLength(val: number);
  /*
  * The allowDigits property.
  */
  get allowDigits(): boolean;
  set allowDigits(val: boolean);
}
/*
* A class that contains expression and url propeties. It uses in survey.navigateToUrlOnCondition array.
* If the expression returns true then url of this item uses instead of survey.navigateToUrl property
*/
export declare class UrlConditionItem extends ExpressionItem {
  constructor(expression?: string, url?: string);
  getType(): string;
  /*
  * The url that survey navigates to on completing the survey. The expression should return true
  */
  get url(): string;
  set url(val: string);
  get locUrl(): LocalizableString;
}
export declare class Variable extends Const {
  constructor(variableName: string);
  static DisableConversionChar: string;
  valueInfo: any;
  useValueAsItIs: boolean;
  getType(): string;
  toString(func?: (op: Operand) => string): string;
  get variable(): string;
  evaluate(processValue?: ProcessValue): any;
  setVariables(variables: any): void;
  protected getCorrectValue(value: any): any;
  protected isContentEqual(op: Operand): boolean;
}
export declare class DragDropRankingChoices extends DragDropChoices {
  constructor(surveyValue?: ISurvey, creator?: any, longTap?: boolean);
  protected get draggedElementType(): string;
  protected createDraggedElementShortcut(text: string, draggedElementNode: any, event: any): any;
  protected getDropTargetByDataAttributeValue(dataAttributeValue: string): ItemValue;
  isDragOverRootNode: boolean;
  protected findDropTargetNodeByDragOverNode(dragOverNode: any): any;
  protected isDropTargetValid(dropTarget: ItemValue, dropTargetNode?: any): boolean;
  protected calculateIsBottom(clientY: number): boolean;
  protected doDragOver: any;
  protected afterDragOver(dropTargetNode: any): void;
  protected ghostPositionChanged(): void;
  protected doBanDropHere: any;
  protected doDrop: any;
  protected doClear: any;
}
export declare class MultiSelectListModel extends ListModel {
  constructor(items: any, onSelectionChanged: (item: Action, status: string) => void, allowSelection: boolean, selectedItems?: any, onFilterStringChangedCallback?: (text: string) => void);
  selectedItems: any;
  hideSelectedItems: boolean;
  onItemClick: (item: Action) => void;
  isItemDisabled: (itemValue: Action) => boolean;
  isItemSelected: (itemValue: Action) => boolean;
  setSelectedItems(newItems: any): void;
  initFocusedItem(): void;
  selectFocusedItem(): void;
}
/*
* A base class for a Panel and Page objects.
*/
export declare class PanelModelBase extends SurveyElement implements IPanel, IConditionRunner, ISurveyErrorOwner, ITitleOwner {
  constructor(name?: string);
  static panelCounter: number;
  elementsValue: any;
  isQuestionsReady: boolean;
  questionsValue: any;
  addElementCallback: (element: IElement) => void;
  removeElementCallback: (element: IElement) => void;
  onGetQuestionTitleLocation: any;
  /*
  * Returns the object type as it is used in the JSON schema.
  */
  getType(): string;
  setSurveyImpl(value: ISurveyImpl, isLight?: boolean): void;
  endLoadingFromJson(): void;
  showTitle: boolean;
  get hasTitle(): boolean;
  protected canShowTitle(): boolean;
  showDescription: boolean;
  get _showDescription(): boolean;
  localeChanged(): void;
  locStrsChanged(): void;
  /*
  * Returns the char/string for a required panel.
  */
  get requiredText(): string;
  protected get titlePattern(): string;
  get isRequireTextOnStart(): boolean;
  get isRequireTextBeforeTitle(): boolean;
  get isRequireTextAfterTitle(): boolean;
  /*
  * The custom text that will be shown on required error. Use this property, if you do not want to show the default text.
  */
  get requiredErrorText(): string;
  set requiredErrorText(val: string);
  get locRequiredErrorText(): LocalizableString;
  /*
  * Use this property to randomize questions. Set it to 'random' to randomize questions, 'initial' to keep them in the same order or 'default' to use the Survey questionsOrder property
  */
  get questionsOrder(): string;
  set questionsOrder(val: string);
  protected isRandomizing: boolean;
  randomizeElements(isRandom: boolean): void;
  /*
  * A parent element. It is always null for the Page object and always not null for the Panel object. Panel object may contain Questions and other Panels.
  */
  get parent(): PanelModelBase;
  set parent(val: PanelModelBase);
  get depth(): number;
  /*
  * An expression that returns true or false. If it returns true the Panel becomes visible and if it returns false the Panel becomes invisible. The library runs the expression on survey start and on changing a question value. If the property is empty then visible property is used.
  */
  get visibleIf(): string;
  set visibleIf(val: string);
  protected calcCssClasses(css: any): any;
  /*
  * A unique element identificator. It is generated automatically.
  */
  get id(): string;
  set id(val: string);
  /*
  * Returns true if the current object is Panel. Returns false if the current object is Page (a root Panel).
  */
  get isPanel(): boolean;
  getPanel(): IPanel;
  getLayoutType(): string;
  isLayoutTypeSupported(layoutType: string): boolean;
  /*
  * Returns the list of all questions located in the Panel/Page, including in the nested Panels.
  */
  get questions(): any;
  protected getValidName(name: string): string;
  /*
  * Returns the question by its name
  */
  getQuestionByName(name: string): Question;
  /*
  * Returns the element by its name. It works recursively.
  */
  getElementByName(name: string): IElement;
  getQuestionByValueName(valueName: string): Question;
  /*
  * Returns question values on the current page
  */
  getValue(): any;
  /*
  * Return questions values as a JSON object with display text. For example, for dropdown, it would return the item text instead of item value.
  */
  getDisplayValue(keysAsText: boolean): any;
  /*
  * Returns question comments on the current page
  */
  getComments(): any;
  /*
  * Call this function to remove all question values from the current page/panel, that end-user will not be able to enter.
  * For example the value that doesn't exists in a radigroup/dropdown/checkbox choices or matrix rows/columns.
  * Please note, this function doesn't clear values for invisible questions or values that doesn't associated with questions.
  */
  clearIncorrectValues(): void;
  /*
  * Call this function to clear all errors in the panel / page and all its child elements (panels and questions)
  */
  clearErrors(): void;
  /*
  * Returns the list of the elements in the object, Panel/Page. Elements can be questions or panels. The function doesn't return elements in the nested Panels.
  */
  get elements(): any;
  getElementsInDesign(includeHidden?: boolean): Array<IElement>;
  /*
  * Returns true if the current element belongs to the Panel/Page. It looks in nested Panels as well.
  */
  containsElement(element: IElement): boolean;
  /*
  * Set this property to true, to require the answer at least in one question in the panel.
  */
  get isRequired(): boolean;
  set isRequired(val: boolean);
  /*
  * An expression that returns true or false. If it returns true the Panel/Page becomes required.
  * The library runs the expression on survey start and on changing a question value. If the property is empty then isRequired property is used.
  */
  get requiredIf(): string;
  set requiredIf(val: string);
  searchText(text: string, founded: any): void;
  /*
  * Returns true, if there is an error on this Page or inside the current Panel
  */
  hasErrors(fireCallback?: boolean, focusOnFirstError?: boolean, rec?: any): boolean;
  getErrorCustomText(text: string, error: SurveyError): string;
  protected hasErrorsCore(rec: any): void;
  protected getContainsErrors(): boolean;
  updateElementVisibility(): void;
  getFirstQuestionToFocus(withError?: boolean): Question;
  /*
  * Call it to focus the input on the first question
  */
  focusFirstQuestion(): void;
  /*
  * Call it to focus the input of the first question that has an error.
  */
  focusFirstErrorQuestion(): void;
  /*
  * Fill list array with the questions.
  */
  addQuestionsToList(list: any, visibleOnly?: boolean, includingDesignTime?: boolean): void;
  /*
  * Fill list array with the panels.
  */
  addPanelsIntoList(list: any, visibleOnly?: boolean, includingDesignTime?: boolean): void;
  /*
  * Returns true if the current object is Page and it is the current page.
  */
  get isActive(): boolean;
  updateCustomWidgets(): void;
  /*
  * Set this property different from "default" to set the specific question title location for this panel/page.
  */
  get questionTitleLocation(): string;
  set questionTitleLocation(val: string);
  getQuestionTitleLocation(): string;
  protected getStartIndex(): string;
  getQuestionStartIndex(): string;
  getChildrenLayoutType(): string;
  getProgressInfo(): IProgressInfo;
  protected get root(): PanelModelBase;
  protected childVisibilityChanged(): void;
  protected createRowAndSetLazy(index: number): QuestionRowModel;
  protected createRow(): QuestionRowModel;
  onSurveyLoad(): void;
  onFirstRendering(): void;
  updateRows(): void;
  get rows(): any;
  ensureRowsVisibility(): void;
  protected onRowsChanged(): void;
  protected onAddElement(element: IElement, index: number): void;
  protected onRemoveElement(element: IElement): void;
  protected canRenderFirstRows(): boolean;
  protected getDragDropInfo(): any;
  protected updateRowsRemoveElementFromRow(element: IElement, row: QuestionRowModel): void;
  elementWidthChanged(el: IElement): void;
  /*
  * Returns rendered title text or html.
  */
  get processedTitle(): string;
  protected getRenderedTitle(str: string): string;
  /*
  * Use it to get/set the object visibility.
  */
  get visible(): boolean;
  set visible(val: boolean);
  protected onVisibleChanged(): void;
  /*
  * Returns true if object is visible or survey is in design mode right now.
  */
  get isVisible(): boolean;
  getIsPageVisible(exceptionQuestion: IQuestion): boolean;
  lastVisibleIndex: number;
  setVisibleIndex(index: number): number;
  protected beforeSetVisibleIndex(index: number): number;
  protected getPanelStartIndex(index: number): number;
  protected isContinueNumbering(): boolean;
  get isReadOnly(): boolean;
  protected onReadOnlyChanged(): void;
  updateElementCss(reNew?: boolean): void;
  /*
  * An expression that returns true or false. If it returns false the Panel/Page becomes read only and an end-user will not able to answer on qustions inside it.
  * The library runs the expression on survey start and on changing a question value. If the property is empty then readOnly property is used.
  */
  get enableIf(): string;
  set enableIf(val: string);
  /*
  * Add an element into Panel or Page. Returns true if the element added successfully. Otherwise returns false.
  */
  addElement(element: IElement, index?: number): boolean;
  insertElementAfter(element: IElement, after: IElement): void;
  insertElementBefore(element: IElement, before: IElement): void;
  protected canAddElement(element: IElement): boolean;
  /*
  * Add a question into Panel or Page. Returns true if the question added successfully. Otherwise returns false.
  */
  addQuestion(question: Question, index?: number): boolean;
  /*
  * Add a panel into Panel or Page.  Returns true if the panel added successfully. Otherwise returns false.
  */
  addPanel(panel: PanelModel, index?: number): boolean;
  /*
  * Creates a new question and adds it at location of index, by default the end of the elements list. Returns null, if the question could not be created or could not be added into page or panel.
  */
  addNewQuestion(questionType: string, name?: string, index?: number): Question;
  /*
  * Creates a new panel and adds it into the end of the elements list. Returns null, if the panel could not be created or could not be added into page or panel.
  */
  addNewPanel(name?: string): PanelModel;
  /*
  * Returns the index of element parameter in the elements list.
  */
  indexOf(element: IElement): number;
  protected createNewPanel(name: string): PanelModel;
  /*
  * Remove an element (Panel or Question) from the elements list.
  */
  removeElement(element: IElement): boolean;
  /*
  * Remove question  from the elements list.
  */
  removeQuestion(question: Question): void;
  runCondition(values: any, properties: any): void;
  onAnyValueChanged(name: string): void;
  checkBindings(valueName: string, value: any): void;
  protected dragDropAddTarget(dragDropInfo: DragDropInfo): void;
  dragDropFindRow(findElement: ISurveyElement): QuestionRowModel;
  dragDropMoveElement(src: IElement, target: IElement, targetIndex: number): void;
  needResponsiveWidth(): boolean;
  get hasDescriptionUnderTitle(): boolean;
  get cssHeader(): string;
  get cssDescription(): string;
  get no(): string;
  dispose(): void;
}
/*
* A base class for all questions.
*/
export declare class Question extends SurveyElement implements IQuestion, IConditionRunner, IValidatorOwner, ITitleOwner {
  constructor(name: string);
  static TextPreprocessorValuesMap: any;
  static questionCounter: number;
  isCustomWidgetRequested: boolean;
  customWidgetValue: QuestionCustomWidget;
  customWidgetData: any;
  focusCallback: any;
  surveyLoadCallback: any;
  displayValueCallback: (text: string) => string;
  defaultValueRunner: ExpressionRunner;
  isChangingViaDefaultValue: boolean;
  isValueChangedDirectly: boolean;
  valueChangedCallback: any;
  commentChangedCallback: any;
  localeChangedCallback: any;
  validateValueCallback: any;
  questionTitleTemplateCallback: any;
  afterRenderQuestionCallback: (question: Question, element: any) => any;
  valueFromDataCallback: (val: any) => any;
  valueToDataCallback: (val: any) => any;
  onGetSurvey: any;
  locProcessedTitle: LocalizableString;
  protected isReadyValue: boolean;
  commentElement: any;
  /*
  * The event is fired when isReady property of question is changed.
  * options.question - the question
  * options.isReady - current value of isReady
  * options.oldIsReady - old value of isReady
  */
  onReadyChanged: EventBase<Question>;
  isReadOnlyRenderDiv(): boolean;
  isMobile: boolean;
  protected createLocTitleProperty(): LocalizableString;
  getSurvey(live?: boolean): ISurvey;
  getValueName(): string;
  /*
  * Use this property if you want to store the question result in the name different from the question name.
  * Question name should be unique in the survey and valueName could be not unique. It allows to share data between several questions with the same valueName.
  * The library set the value automatically if the question.name property is not valid. For example, if it contains the period '.' symbol.
  * In this case if you set the question.name property to 'x.y' then the valueName becomes 'x y'.
  * Please note, this property is hidden for questions without input, for example html question.
  */
  get valueName(): string;
  set valueName(val: string);
  protected onValueNameChanged(oldValue: string): void;
  protected onNameChanged(oldValue: string): void;
  get isReady(): boolean;
  /*
  * A11Y properties
  */
  get ariaRequired(): "true" | "false";
  get ariaInvalid(): "true" | "false";
  get ariaDescribedBy(): string;
  /*
  * Get is question ready to use
  */
  choicesLoaded(): void;
  /*
  * Get/set the page where the question is located.
  */
  get page(): IPage;
  set page(val: IPage);
  getPanel(): IPanel;
  delete(): void;
  get isFlowLayout(): boolean;
  getLayoutType(): string;
  isLayoutTypeSupported(layoutType: string): boolean;
  /*
  * Use it to get/set the question visibility.
  */
  get visible(): boolean;
  set visible(val: boolean);
  protected onVisibleChanged(): void;
  /*
  * Use it to choose how other question values will be rendered in title if referenced in {}.
  * Please note, this property is hidden for question without input, for example html question.
  */
  get useDisplayValuesInTitle(): boolean;
  set useDisplayValuesInTitle(val: boolean);
  protected getUseDisplayValuesInTitle(): boolean;
  /*
  * An expression that returns true or false. If it returns true the Question becomes visible and if it returns false the Question becomes invisible. The library runs the expression on survey start and on changing a question value. If the property is empty then visible property is used.
  */
  get visibleIf(): string;
  set visibleIf(val: string);
  /*
  * Returns true if the question is visible or survey is in design mode right now.
  */
  get isVisible(): boolean;
  /*
  * Returns the visible index of the question in the survey. It can be from 0 to all visible questions count - 1
  * The visibleIndex is -1 if the title is 'hidden' or hideNumber is true
  */
  get visibleIndex(): number;
  /*
  * Set hideNumber to true to stop showing the number for this question. The question will not be counter
  */
  get hideNumber(): boolean;
  set hideNumber(val: boolean);
  /*
  * Returns true if the question may have a title located on the left
  */
  get isAllowTitleLeft(): boolean;
  /*
  * Returns the question type.
  * Possible values:
  * - [*"boolean"*](https://surveyjs.io/Documentation/Library?id=questionbooleanmodel)
  * - [*"checkbox"*](https://surveyjs.io/Documentation/Library?id=questioncheckboxmodel)
  * - [*"comment"*](https://surveyjs.io/Documentation/Library?id=questioncommentmodel)
  * - [*"dropdown"*](https://surveyjs.io/Documentation/Library?id=questiondropdownmodel)
  * - [*"expression"*](https://surveyjs.io/Documentation/Library?id=questionexpressionmodel)
  * - [*"file"*](https://surveyjs.io/Documentation/Library?id=questionfilemodel)
  * - [*"html"*](https://surveyjs.io/Documentation/Library?id=questionhtmlmodel)
  * - [*"image"*](https://surveyjs.io/Documentation/Library?id=questionimagemodel)
  * - [*"imagepicker"*](https://surveyjs.io/Documentation/Library?id=questionimagepickermodel)
  * - [*"matrix"*](https://surveyjs.io/Documentation/Library?id=questionmatrixmodel)
  * - [*"matrixdropdown"*](https://surveyjs.io/Documentation/Library?id=questionmatrixdropdownmodel)
  * - [*"matrixdynamic"*](https://surveyjs.io/Documentation/Library?id=questionmatrixdynamicmodel)
  * - [*"multipletext"*](https://surveyjs.io/Documentation/Library?id=questionmultipletextmodel)
  * - [*"panel"*](https://surveyjs.io/Documentation/Library?id=panelmodel)
  * - [*"paneldynamic"*](https://surveyjs.io/Documentation/Library?id=questionpaneldynamicmodel)
  * - [*"radiogroup"*](https://surveyjs.io/Documentation/Library?id=questionradiogroupmodel)
  * - [*"rating"*](https://surveyjs.io/Documentation/Library?id=questionratingmodel)
  * - [*"ranking"*](https://surveyjs.io/Documentation/Library?id=questionrankingmodel)
  * - [*"signaturepad"*](https://surveyjs.io/Documentation/Library?id=questionsignaturepadmodel)
  * - [*"text"*](https://surveyjs.io/Documentation/Library?id=questiontextmodel)
  */
  getType(): string;
  get isQuestion(): boolean;
  /*
  * Move question to a new container Page/Panel. Add as a last element if insertBefore parameter is not used or inserted into the given index,
  * if insert parameter is number, or before the given element, if the insertBefore parameter is a question or panel
  */
  moveTo(container: IPanel, insertBefore?: any): boolean;
  getProgressInfo(): IProgressInfo;
  setSurveyImpl(value: ISurveyImpl, isLight?: boolean): void;
  /*
  * A parent element. It can be panel or page.
  */
  get parent(): IPanel;
  set parent(val: IPanel);
  parentQuestionValue: Question;
  /*
  * A parent question. It can be a dynamic panel or dynamic/dropdown matrices. If the value is a matrix, it means that question is a cell question.
  * This property is null for a stand alone question.
  */
  get parentQuestion(): Question;
  setParentQuestion(val: Question): void;
  protected onParentQuestionChanged(): void;
  protected onParentChanged(): void;
  /*
  * Returns false if the question doesn't have a title property, for example: QuestionHtmlModel, or titleLocation property equals to "hidden"
  */
  get hasTitle(): boolean;
  /*
  * Set this property different from "default" to set the specific question title location for this panel/page.
  * Please note, this property is hidden for questions without input, for example html question.
  */
  get titleLocation(): string;
  set titleLocation(val: string);
  getTitleOwner(): ITitleOwner;
  /*
  * Return the title location based on question titleLocation property and QuestionTitleLocation of it's parents
  */
  getTitleLocation(): string;
  protected getTitleLocationCore(): string;
  get hasTitleOnLeft(): boolean;
  get hasTitleOnTop(): boolean;
  get hasTitleOnBottom(): boolean;
  get hasTitleOnLeftTop(): boolean;
  get errorLocation(): string;
  /*
  * Returns false if the question doesn't have an input element, for example: QuestionHtmlModel
  */
  get hasInput(): boolean;
  /*
  * Returns false if the question doesn't have an input element or have multiple inputs: matrices or panel dynamic
  */
  get hasSingleInput(): boolean;
  get inputId(): string;
  protected getDefaultTitleValue(): string;
  protected getDefaultTitleTagName(): string;
  /*
  * Question description location. By default, value is "default" and it depends on survey questionDescriptionLocation property
  * You may change it to "underInput" to render it under question input or "underTitle" to rendered it under title.
  */
  get descriptionLocation(): string;
  set descriptionLocation(val: string);
  get hasDescriptionUnderTitle(): boolean;
  get hasDescriptionUnderInput(): boolean;
  protected needClickTitleFunction(): boolean;
  protected processTitleClick(): boolean;
  /*
  * The custom text that will be shown on required error. Use this property, if you do not want to show the default text.
  * Please note, this property is hidden for question without input, for example html question.
  */
  get requiredErrorText(): string;
  set requiredErrorText(val: string);
  get locRequiredErrorText(): LocalizableString;
  /*
  * Use it to get or set the comment value.
  */
  get commentText(): string;
  set commentText(val: string);
  get locCommentText(): LocalizableString;
  /*
  * Use this property to set the place holder text for comment field  .
  */
  get commentPlaceHolder(): string;
  set commentPlaceHolder(val: string);
  get locCommentPlaceHolder(): LocalizableString;
  get commentOrOtherPlaceHolder(): string;
  /*
  * Returns a copy of question errors survey. For some questions like matrix and panel dynamic it includes the errors of nested questions.
  */
  getAllErrors(): Array<SurveyError>;
  getErrorByType(errorType: string): SurveyError;
  /*
  * The link to the custom widget.
  */
  get customWidget(): QuestionCustomWidget;
  updateCustomWidget(): void;
  localeChanged(): void;
  get isCompositeQuestion(): boolean;
  updateCommentElement(): void;
  onCommentInput(event: any): void;
  onCommentChange(event: any): void;
  afterRenderQuestionElement(el: any): void;
  afterRender(el: any): void;
  beforeDestroyQuestionElement(el: any): void;
  /*
  * Returns the rendred question title.
  */
  get processedTitle(): string;
  /*
  * Returns the title after processing the question template.
  */
  get fullTitle(): string;
  protected get titlePattern(): string;
  get isRequireTextOnStart(): boolean;
  get isRequireTextBeforeTitle(): boolean;
  get isRequireTextAfterTitle(): boolean;
  /*
  * The Question renders on the new line if the property is true. If the property is false, the question tries to render on the same line/row with a previous question/panel.
  */
  get startWithNewLine(): boolean;
  set startWithNewLine(val: boolean);
  protected calcCssClasses(css: any): any;
  get cssRoot(): string;
  protected setCssRoot(val: string): void;
  protected getCssRoot(cssClasses: any): string;
  get cssHeader(): string;
  protected setCssHeader(val: string): void;
  protected getCssHeader(cssClasses: any): string;
  get cssContent(): string;
  protected setCssContent(val: string): void;
  protected getCssContent(cssClasses: any): string;
  get cssTitle(): string;
  protected setCssTitle(val: string): void;
  protected getCssTitle(cssClasses: any): string;
  get cssDescription(): string;
  protected setCssDescription(val: string): void;
  protected getCssDescription(cssClasses: any): string;
  protected getIsErrorsModeTooltip(): boolean;
  showErrorOnCore(location: string): boolean;
  get showErrorOnTop(): boolean;
  get showErrorOnBottom(): boolean;
  get showErrorsAboveQuestion(): boolean;
  get showErrorsBelowQuestion(): boolean;
  get cssError(): string;
  protected setCssError(val: string): void;
  protected getCssError(cssClasses: any): string;
  getRootCss(): string;
  updateElementCss(reNew?: boolean): void;
  protected updateQuestionCss(reNew?: boolean): void;
  protected updateElementCssCore(cssClasses: any): void;
  protected updateCssClasses(res: any, css: any): void;
  protected getCssType(): string;
  get renderCssRoot(): string;
  /*
  * Move the focus to the input of this question.
  */
  focus(onError?: boolean): void;
  focusIn: any;
  protected fireCallback(callback: any): void;
  getOthersMaxLength(): any;
  protected onCreating(): void;
  getFirstQuestionToFocus(withError: boolean): Question;
  protected getFirstInputElementId(): string;
  protected getFirstErrorInputElementId(): string;
  protected getProcessedTextValue(textValue: TextPreProcessorValue): void;
  supportComment(): boolean;
  supportOther(): boolean;
  /*
  * Set this property to true, to make the question a required. If a user doesn't answer the question then a validation error will be generated.
  * Please note, this property is hidden for question without input, for example html question.
  */
  get isRequired(): boolean;
  set isRequired(val: boolean);
  /*
  * An expression that returns true or false. If it returns true the Question becomes required and an end-user has to answer it.
  * If it returns false the Question then an end-user may not answer it the Question maybe empty.
  * The library runs the expression on survey start and on changing a question value. If the property is empty then isRequired property is used.
  * Please note, this property is hidden for question without input, for example html question.
  */
  get requiredIf(): string;
  set requiredIf(val: string);
  /*
  * Set it to true, to add a comment for the question.
  */
  get hasComment(): boolean;
  set hasComment(val: boolean);
  /*
  * The unique identificator. It is generated automatically.
  */
  get id(): string;
  set id(val: string);
  get ariaTitleId(): string;
  get ariaRole(): string;
  /*
  * Specifies whether to display the "Other" choice item.
  */
  get hasOther(): boolean;
  set hasOther(val: boolean);
  protected hasOtherChanged(): void;
  get requireUpdateCommentValue(): boolean;
  get isReadOnly(): boolean;
  get isInputReadOnly(): boolean;
  get renderedInputReadOnly(): string;
  get renderedInputDisabled(): string;
  protected onReadOnlyChanged(): void;
  /*
  * An expression that returns true or false. If it returns false the Question becomes read only and an end-user will not able to answer on the qustion. The library runs the expression on survey start and on changing a question value. If the property is empty then readOnly property is used.
  * Please note, this property is hidden for question without input, for example html question.
  */
  get enableIf(): string;
  set enableIf(val: string);
  surveyChoiceItemVisibilityChange(): void;
  /*
  * Run visibleIf and enableIf expressions. If visibleIf or/and enabledIf are not empty, then the results of performing the expression (true or false) set to the visible/readOnly properties.
  */
  runCondition(values: any, properties: any): void;
  /*
  * The property returns the question number. If question is invisible then it returns empty string.
  * If visibleIndex is 1, then no is 2, or 'B' if survey.questionStartIndex is 'A'.
  */
  get no(): string;
  protected getStartIndex(): string;
  onSurveyLoad(): void;
  protected onSetData(): void;
  protected initDataFromSurvey(): void;
  protected initCommentFromSurvey(): void;
  protected runExpression(expression: string): any;
  /*
  * Get/Set the question value.
  */
  get value(): any;
  set value(val: any);
  get valueForSurvey(): any;
  /*
  * Clear the question value. It clears the question comment as well.
  */
  clearValue(): void;
  unbindValue(): void;
  createValueCopy(): any;
  protected getUnbindValue(value: any): any;
  protected isValueSurveyElement(val: any): boolean;
  /*
  * Return true if there is a parent (page or panel) and it is visible
  */
  get isParentVisible(): boolean;
  clearValueIfInvisible(reason?: string): void;
  protected clearValueIfInvisibleCore(): void;
  /*
  * Gets or sets a value that specifies how invisible question clears the value. By default the behavior is define by Survey "clearInvisibleValues" property.
  * 
  * The following options are available:
  * 
  * - `default` (default) - Survey "clearInvisibleValues" property defines the behavior.
  * - `none` - do not clear invisible value.
  * - `onHidden` - clear the question value when it becomes invisible. If a question has value and it was invisible initially then survey clears the value on completing.
  * - `onComplete` - clear invisible question value on survey complete.
  */
  get clearIfInvisible(): string;
  set clearIfInvisible(val: string);
  get displayValue(): any;
  /*
  * Return the question value as a display text. For example, for dropdown, it would return the item text instead of item value.
  */
  getDisplayValue(keysAsText: boolean, value?: any): any;
  protected getDisplayValueCore(keyAsText: boolean, value: any): any;
  protected getDisplayValueEmpty(): string;
  /*
  * A default value for the question. Ignored for question types that cannot have a [value](https://surveyjs.io/Documentation/Library?id=Question#value) (for example, HTML).
  * 
  * The default value is used as a question value in the following cases:
  * 
  * - While the survey is being loaded from JSON.
  * - The question is just added to the survey and does not yet have an answer.
  * - The respondent left the answer empty.
  */
  get defaultValue(): any;
  set defaultValue(val: any);
  /*
  * An expression used to calculate the [defaultValue](https://surveyjs.io/Documentation/Library?id=Question#defaultValue).
  * 
  * This expression applies until the question [value](https://surveyjs.io/Documentation/Library?id=Question#value) is specified by an end user or programmatically.
  * 
  * An expression can reference other questions as follows:
  * 
  * - `{other_question_name}`
  * - `{panel.other_question_name}` (to access questions inside the same dynamic panel)
  * - `{row.other_question_name}` (to access questions inside the same dynamic matrix or multi-column dropdown)
  * 
  * An expression can also include built-in and custom functions for advanced calculations. For example, if the `defaultValue` should be today's date, set the `defaultValueExpression` to `"today()"`, and the corresponding built-in function will be executed each time the survey is loaded. Refer to the following help topic for more information: [Use Functions in Expressions](https://surveyjs.io/Documentation/Library#conditions-functions).
  */
  get defaultValueExpression(): any;
  set defaultValueExpression(val: any);
  get resizeStyle(): "none" | "both";
  /*
  * Returns question answer data as a plain object: with question title, name, value and displayValue.
  * For complex questions (like matrix, etc.) isNode flag is set to true and data contains array of nested objects (rows)
  * set options.includeEmpty to false if you want to skip empty answers
  */
  getPlainData(options?: any): any;
  /*
  * The correct answer on the question. Set this value if you are doing a quiz.
  * Please note, this property is hidden for question without input, for example html question.
  */
  get correctAnswer(): any;
  set correctAnswer(val: any);
  protected convertDefaultValue(val: any): any;
  /*
  * Returns questions count: 1 for the non-matrix questions and all inner visible questions that has input(s) widgets for question of matrix types.
  */
  get quizQuestionCount(): number;
  get correctAnswerCount(): number;
  protected getQuizQuestionCount(): number;
  protected getCorrectAnswerCount(): number;
  isAnswerCorrect(): boolean;
  updateValueWithDefaults(): void;
  protected get isClearValueOnHidden(): boolean;
  getQuestionFromArray(name: string, index: number): IQuestion;
  getDefaultValue(): any;
  protected isDefaultValueEmpty(): boolean;
  protected getDefaultRunner(runner: ExpressionRunner, expression: string): ExpressionRunner;
  protected setDefaultValue(): void;
  protected isValueExpression(val: any): boolean;
  protected setValueAndRunExpression(runner: ExpressionRunner, defaultValue: any, setFunc: (val: any) => void, values?: any, properties?: any): void;
  /*
  * The question comment value.
  */
  get comment(): string;
  set comment(val: string);
  protected getQuestionComment(): string;
  protected setQuestionComment(newValue: string): void;
  /*
  * Returns true if the question value is empty
  */
  isEmpty(): boolean;
  get isAnswered(): boolean;
  set isAnswered(val: boolean);
  protected updateIsAnswered(): void;
  protected getIsAnswered(): boolean;
  /*
  * The list of question validators.
  * Please note, this property is hidden for question without input, for example html question.
  */
  get validators(): any;
  set validators(val: any);
  getValidators(): Array<SurveyValidator>;
  getSupportedValidators(): Array<any>;
  addConditionObjectsByContext(objects: any, context: any): void;
  getConditionJson(operator?: string, path?: string): any;
  /*
  * Returns true if there is a validation error(s) in the question.
  */
  hasErrors(fireCallback?: boolean, rec?: any): boolean;
  /*
  * Returns the validation errors count.
  */
  get currentErrorCount(): number;
  /*
  * Returns the char/string for a required question.
  */
  get requiredText(): string;
  /*
  * Add error into the question error list.
  */
  addError(error: string | SurveyError): void;
  /*
  * Remove a particular error from the question error list.
  */
  removeError(error: SurveyError): void;
  protected canCollectErrors(): boolean;
  protected canRunValidators(isOnValueChanged: boolean): boolean;
  protected onCheckForErrors(errors: any, isOnValueChanged: boolean): void;
  protected hasRequiredError(): boolean;
  validatorRunner: ValidatorRunner;
  isRunningValidatorsValue: boolean;
  onCompletedAsyncValidators: (hasErrors: boolean) => void;
  get isRunningValidators(): boolean;
  protected getIsRunningValidators(): boolean;
  protected runValidators(): Array<SurveyError>;
  protected raiseOnCompletedAsyncValidators(): void;
  isValueChangedInSurvey: boolean;
  protected allowNotifyValueChanged: boolean;
  protected setNewValue(newValue: any): void;
  protected isTextValue(): boolean;
  get isSurveyInputTextUpdate(): boolean;
  get isInputTextUpdate(): boolean;
  protected setNewValueInData(newValue: any): void;
  protected getValueCore(): any;
  protected setValueCore(newValue: any): void;
  protected canSetValueToSurvey(): boolean;
  protected valueFromData(val: any): any;
  protected valueToData(val: any): any;
  protected onValueChanged(): void;
  protected setNewComment(newValue: string): void;
  protected getValidName(name: string): string;
  updateValueFromSurvey(newValue: any): void;
  updateCommentFromSurvey(newValue: any): any;
  protected setQuestionValue(newValue: any, updateIsAnswered?: boolean): void;
  onSurveyValueChanged(newValue: any): void;
  setVisibleIndex(val: number): number;
  removeElement(element: IElement): boolean;
  supportGoNextPageAutomatic(): boolean;
  supportGoNextPageError(): boolean;
  /*
  * Call this function to remove values from the current question, that end-user will not be able to enter.
  * For example the value that doesn't exists in a radigroup/dropdown/checkbox choices or matrix rows/columns.
  */
  clearIncorrectValues(): void;
  clearOnDeletingContainer(): void;
  /*
  * Call this function to clear all errors in the question
  */
  clearErrors(): void;
  clearUnusedValues(): void;
  onAnyValueChanged(name: string): void;
  checkBindings(valueName: string, value: any): void;
  getComponentName(): string;
  isDefaultRendering(): boolean;
  renderAs: string;
  getErrorCustomText(text: string, error: SurveyError): string;
  getValidatorTitle(): string;
  get validatedValue(): any;
  set validatedValue(val: any);
  getAllValues(): any;
  transformToMobileView(): void;
  transformToDesktopView(): void;
  needResponsiveWidth(): boolean;
  protected supportResponsiveness(): boolean;
  protected needResponsiveness(): boolean;
  protected checkForResponsiveness(el: any): void;
  resizeObserver: any;
  protected getObservedElementSelector(): string;
  onMobileChangedCallback: any;
  protected getCompactRenderAs(): string;
  protected getDesktopRenderAs(): string;
  protected processResponsiveness(requiredWidth: number, availableWidth: number): any;
  dispose(): void;
}
export declare class QuestionCheckboxBaseImplementor extends QuestionSelectBaseImplementor {
  constructor(question: any);
}
export declare class QuestionDropdownImplementor extends QuestionSelectBaseImplementor {
  constructor(question: any);
}
export declare class QuestionMatrixDynamicImplementor extends QuestionMatrixBaseImplementor {
  constructor(question: any);
  protected addRow(): void;
  protected removeRow(row: any): void;
  getKoPopupIsVisible(row: any): any;
  dispose(): void;
}
export declare class Survey extends SurveyModel {
  constructor(jsonObj?: any, renderedElement?: any);
  implementor: SurveyImplementor;
  render(element?: any): void;
  getHtmlTemplate(): string;
  makeReactive(obj: any): void;
}
/*
* If expression returns true, it completes the survey.
*/
export declare class SurveyTriggerComplete extends SurveyTrigger {
  constructor();
  getType(): string;
  protected isRealExecution(): boolean;
  protected onSuccess(values: any, properties: any): void;
}
/*
* If expression returns true, the value from question **fromName** will be set into **setToName**.
*/
export declare class SurveyTriggerCopyValue extends SurveyTrigger {
  constructor();
  get setToName(): string;
  set setToName(val: string);
  get fromName(): string;
  set fromName(val: string);
  getType(): string;
  protected onSuccess(values: any, properties: any): void;
}
/*
* If expression returns true, the **runExpression** will be run. If **setToName** property is not empty then the result of **runExpression** will be set to it.
*/
export declare class SurveyTriggerRunExpression extends SurveyTrigger {
  constructor();
  getType(): string;
  get setToName(): string;
  set setToName(val: string);
  get runExpression(): string;
  set runExpression(val: string);
  protected onSuccess(values: any, properties: any): void;
}
/*
* If expression returns true, the value from property **setValue** will be set to **setToName**
*/
export declare class SurveyTriggerSetValue extends SurveyTrigger {
  constructor();
  getType(): string;
  protected onPropertyValueChanged(name: string, oldValue: any, newValue: any): void;
  get setToName(): string;
  set setToName(val: string);
  get setValue(): any;
  set setValue(val: any);
  get isVariable(): boolean;
  set isVariable(val: boolean);
  protected onSuccess(values: any, properties: any): void;
}
/*
* If expression returns true, the survey go to question **gotoName** and focus it.
*/
export declare class SurveyTriggerSkip extends SurveyTrigger {
  constructor();
  getType(): string;
  get gotoName(): string;
  set gotoName(val: string);
  protected canBeExecuted(isOnNextPage: boolean): boolean;
  protected onSuccess(values: any, properties: any): void;
}
/*
* If expression returns true, it makes questions/pages visible.
* Ohterwise it makes them invisible.
*/
export declare class SurveyTriggerVisible extends SurveyTrigger {
  constructor();
  pages: any;
  questions: any;
  getType(): string;
  protected onSuccess(values: any, properties: any): void;
  protected onFailure(): void;
  protected onItemSuccess(item: any): void;
  protected onItemFailure(item: any): void;
}
export declare class SurveyWindow extends PopupSurvey {
  constructor(jsonObj: any, initialModel?: any);
}
/*
* The page object. It has elements collection, that contains questions and panels.
*/
export declare class PageModel extends PanelModelBase implements IPage {
  constructor(name?: string);
  hasShownValue: boolean;
  getType(): string;
  toString(): string;
  get isPage(): boolean;
  protected canShowPageNumber(): boolean;
  protected canShowTitle(): boolean;
  /*
  * Use this property to show title in navigation buttons. If the value is empty then page name is used.
  */
  get navigationTitle(): string;
  set navigationTitle(val: string);
  get locNavigationTitle(): LocalizableString;
  get navigationDescription(): string;
  set navigationDescription(val: string);
  get locNavigationDescription(): LocalizableString;
  navigationLocStrChanged(): void;
  get passed(): boolean;
  set passed(val: boolean);
  delete(): void;
  onFirstRendering(): void;
  /*
  * The visible index of the page. It has values from 0 to visible page count - 1.
  */
  get visibleIndex(): number;
  set visibleIndex(val: number);
  protected canRenderFirstRows(): boolean;
  /*
  * Returns true, if the page is started page in the survey. It can be shown on the start only and the end-user could not comeback to it after it passed it.
  */
  get isStarted(): boolean;
  protected calcCssClasses(css: any): any;
  get cssTitle(): string;
  get cssRoot(): string;
  num: number;
  /*
  * Set this property to "hide" to make "Prev", "Next" and "Complete" buttons are invisible for this page. Set this property to "show" to make these buttons visible, even if survey showNavigationButtons property is false.
  */
  get navigationButtonsVisibility(): string;
  set navigationButtonsVisibility(val: string);
  /*
  * The property returns true, if the page has been shown to the end-user.
  */
  get wasShown(): boolean;
  get hasShown(): boolean;
  setWasShown(val: boolean): void;
  /*
  * The property returns true, if the elements are randomized on the page
  */
  get areQuestionsRandomized(): boolean;
  /*
  * Call it to scroll to the page top.
  */
  scrollToTop(): void;
  /*
  * Time in seconds end-user spent on this page
  */
  timeSpent: number;
  /*
  * Returns the list of all panels in the page
  */
  getPanels(visibleOnly?: boolean, includingDesignTime?: boolean): Array<IPanel>;
  /*
  * The maximum time in seconds that end-user has to complete the page. If the value is 0 or less, the end-user has unlimited number of time to finish the page.
  */
  get maxTimeToFinish(): number;
  set maxTimeToFinish(val: number);
  protected onNumChanged(value: number): void;
  protected onVisibleChanged(): void;
  dragDropInfo: DragDropInfo;
  protected getDragDropInfo(): any;
  dragDropStart(src: IElement, target: IElement, nestedPanelDepth?: number): void;
  dragDropMoveTo(destination: ISurveyElement, isBottom?: boolean, isEdge?: boolean): boolean;
  dragDropFinish(isCancel?: boolean): IElement;
  ensureRowsVisibility(): void;
}
/*
* A container element, similar to the Page objects. However, unlike the Page, Panel can't be a root.
* It may contain questions and other panels.
*/
export declare class PanelModel extends PanelModelBase implements IElement {
  constructor(name?: string);
  getType(): string;
  get contentId(): string;
  getSurvey(live?: boolean): ISurvey;
  onSurveyLoad(): void;
  protected onSetData(): void;
  get isPanel(): boolean;
  /*
  * Get/set the page where the panel is located.
  */
  get page(): IPage;
  set page(val: IPage);
  delete(): void;
  /*
  * Move panel to a new container Page/Panel. Add as a last element if insertBefore parameter is not used or inserted into the given index,
  * if insert parameter is number, or before the given element, if the insertBefore parameter is a question or panel
  */
  moveTo(container: IPanel, insertBefore?: any): boolean;
  /*
  * Returns the visible index of the panel in the survey. Commonly it is -1 and it doesn't show.
  * You have to set showNumber to true to show index/numbering for the Panel
  */
  get visibleIndex(): number;
  getTitleOwner(): ITitleOwner;
  /*
  * Set showNumber to true to start showing the number for this panel.
  */
  get showNumber(): boolean;
  set showNumber(val: boolean);
  /*
  * Gets or sets a value that specifies how the elements numbers inside panel are displayed.
  * 
  * The following options are available:
  * 
  * - `default` - display questions numbers as defined in parent panel or survey
  * - `onpanel` - display questions numbers, start numbering from beginning of this page
  * - `off` - turn off the numbering for questions titles
  */
  get showQuestionNumbers(): string;
  set showQuestionNumbers(val: string);
  /*
  * Gets or sets the first question index for elements inside the panel. The first question index is '1.' by default and it is taken from survey.questionStartIndex property.
  * You may start it from '100' or from 'A', by setting '100' or 'A' to this property.
  * You can set the start index to "(1)" or "# A)" or "a)" to render question number as (1), # A) and a) accordingly.
  */
  get questionStartIndex(): string;
  set questionStartIndex(val: string);
  getQuestionStartIndex(): string;
  /*
  * The property returns the question number. If question is invisible then it returns empty string.
  * If visibleIndex is 1, then no is 2, or 'B' if survey.questionStartIndex is 'A'.
  */
  get no(): string;
  protected setNo(visibleIndex: number): void;
  protected beforeSetVisibleIndex(index: number): number;
  protected getPanelStartIndex(index: number): number;
  protected isContinueNumbering(): boolean;
  protected hasErrorsCore(rec: any): void;
  protected getRenderedTitle(str: string): string;
  /*
  * The inner indent. Set this property to increase the panel content margin.
  */
  get innerIndent(): number;
  set innerIndent(val: number);
  /*
  * The Panel renders on the new line if the property is true. If the property is false, the panel tries to render on the same line/row with a previous question/panel.
  */
  get startWithNewLine(): boolean;
  set startWithNewLine(val: boolean);
  /*
  * The Panel toolbar gets adaptive if the property is set to true.
  */
  get allowAdaptiveActions(): boolean;
  set allowAdaptiveActions(val: boolean);
  get innerPaddingLeft(): string;
  set innerPaddingLeft(val: string);
  clearOnDeletingContainer(): void;
  get footerActions(): any;
  footerToolbarValue: any;
  getFooterToolbar(): ActionContainer;
  get hasEditButton(): boolean;
  cancelPreview(): void;
  get cssTitle(): string;
  get cssError(): string;
  protected getCssError(cssClasses: any): string;
  protected onVisibleChanged(): void;
  needResponsiveWidth(): boolean;
  focusIn: any;
  getContainerCss(): string;
}
/*
* A Model for a boolean question.
*/
export declare class QuestionBooleanModel extends Question {
  constructor(name: string);
  getType(): string;
  isLayoutTypeSupported(layoutType: string): boolean;
  supportGoNextPageAutomatic(): boolean;
  /*
  * Returns true if the question check will be rendered in indeterminate mode. value is empty.
  */
  get isIndeterminate(): boolean;
  get hasTitle(): boolean;
  /*
  * Get/set question value in 3 modes: indeterminate (value is empty), true (check is set) and false (check is unset).
  */
  get checkedValue(): any;
  set checkedValue(val: any);
  /*
  * Set the default state of the check: "indeterminate" - default (value is empty/null), "true" - value equals valueTrue or true, "false" - value equals valueFalse or false.
  */
  get defaultValue(): any;
  set defaultValue(val: any);
  getDefaultValue(): any;
  get locTitle(): LocalizableString;
  /*
  * The checkbox label. If it is empty and showTitle is false then title is rendered
  */
  get label(): string;
  set label(val: string);
  get locLabel(): LocalizableString;
  get locDisplayLabel(): LocalizableString;
  /*
  * Set this property, if you want to have a different label for state when check is set.
  */
  get labelTrue(): any;
  set labelTrue(val: any);
  get locLabelTrue(): LocalizableString;
  get isDeterminated(): boolean;
  /*
  * Set this property, if you want to have a different label for state when check is unset.
  */
  get labelFalse(): any;
  set labelFalse(val: any);
  get locLabelFalse(): LocalizableString;
  /*
  * Set this property to true to show the question title. It is hidden by default.
  */
  showTitle: boolean;
  /*
  * Set this property, if you want to have a different value from true when check is set.
  */
  valueTrue: any;
  /*
  * Set this property, if you want to have a different value from false when check is unset.
  */
  valueFalse: any;
  protected setDefaultValue(): void;
  protected getDisplayValueCore(keysAsText: boolean, value: any): any;
  getItemCss(): string;
  getCheckboxItemCss(): string;
  getLabelCss(checked: boolean): string;
  get svgIcon(): string;
  get allowClick(): boolean;
  getCheckedLabel(): LocalizableString;
  protected setQuestionValue(newValue: any, updateIsAnswered?: boolean): void;
  onLabelClick(event: any, value: boolean): boolean;
  onSwitchClickModel(event: any): boolean;
  onKeyDownCore(event: any): boolean;
  getRadioItemClass(css: any, value: any): string;
  protected supportResponsiveness(): boolean;
  protected getCompactRenderAs(): string;
}
export declare class QuestionCheckboxImplementor extends QuestionCheckboxBaseImplementor {
  constructor(question: any);
  protected getKoValue(): any;
  protected setKoValue(val: any): void;
}
export declare class QuestionCustomModelBase extends Question implements ISurveyImpl, ISurveyData, IPanel {
  constructor(name: string, customQuestion: ComponentQuestionJSON);
  customQuestion: ComponentQuestionJSON;
  getType(): string;
  locStrsChanged(): void;
  protected createWrapper(): void;
  protected onPropertyValueChanged(name: string, oldValue: any, newValue: any): void;
  itemValuePropertyChanged(item: ItemValue, name: string, oldValue: any, newValue: any): void;
  onFirstRendering(): void;
  protected getElement(): SurveyElement;
  protected initElement(el: SurveyElement): void;
  setSurveyImpl(value: ISurveyImpl, isLight?: boolean): void;
  onSurveyLoad(): void;
  afterRenderQuestionElement(el: any): void;
  afterRender(el: any): void;
  protected setQuestionValue(newValue: any, updateIsAnswered?: boolean): void;
  protected setNewValue(newValue: any): void;
  getSurveyData(): ISurveyData;
  getTextProcessor(): ITextProcessor;
  getValue(name: string): any;
  setValue(name: string, newValue: any, locNotification: any, allowNotifyValueChanged?: boolean): any;
  protected convertDataName(name: string): string;
  protected convertDataValue(name: string, newValue: any): any;
  getVariable(name: string): any;
  setVariable(name: string, newValue: any): void;
  getComment(name: string): string;
  setComment(name: string, newValue: string, locNotification: any): any;
  getAllValues(): any;
  getFilteredValues(): any;
  getFilteredProperties(): any;
  addElement(element: IElement, index: number): void;
  removeElement(element: IElement): boolean;
  getQuestionTitleLocation(): string;
  getQuestionStartIndex(): string;
  getChildrenLayoutType(): string;
  elementWidthChanged(el: IElement): void;
  get elements(): any;
  indexOf(el: IElement): number;
  ensureRowsVisibility(): void;
  protected getContentDisplayValueCore(keyAsText: boolean, value: any, question: Question): any;
}
/*
* A Model for an question that renders empty "div" tag. It used as a base class for some custom widgets
*/
export declare class QuestionEmptyModel extends Question {
  constructor(name: string);
  getType(): string;
}
/*
* A Model for expression question. It is a read-only question. It calculates value based on epxression property.
*/
export declare class QuestionExpressionModel extends Question {
  constructor(name: string);
  expressionIsRunning: boolean;
  expressionRunner: ExpressionRunner;
  getType(): string;
  get hasInput(): boolean;
  /*
  * Use this property to display the value in your own format. Make sure you have "{0}" substring in your string, to display the actual value.
  */
  get format(): string;
  set format(val: string);
  get locFormat(): LocalizableString;
  /*
  * The Expression that used to calculate the question value. You may use standard operators like +, -, * and /, squares (). Here is the example of accessing the question value {questionname}.
  * Example: "({quantity} * {price}) * (100 - {discount}) / 100"
  */
  get expression(): string;
  set expression(val: string);
  locCalculation(): void;
  unlocCalculation(): void;
  runCondition(values: any, properties: any): void;
  protected canCollectErrors(): boolean;
  protected hasRequiredError(): boolean;
  /*
  * The maximum number of fraction digits to use if displayStyle is not "none". Possible values are from 0 to 20. The default value is -1 and it means that this property is not used.
  */
  get maximumFractionDigits(): number;
  set maximumFractionDigits(val: number);
  /*
  * The minimum number of fraction digits to use if displayStyle is not "none". Possible values are from 0 to 20. The default value is -1 and it means that this property is not used.
  */
  get minimumFractionDigits(): number;
  set minimumFractionDigits(val: number);
  runIfReadOnlyValue: boolean;
  get runIfReadOnly(): boolean;
  set runIfReadOnly(val: boolean);
  get formatedValue(): string;
  protected updateFormatedValue(): void;
  protected onValueChanged(): void;
  updateValueFromSurvey(newValue: any): void;
  protected getDisplayValueCore(keysAsText: boolean, value: any): any;
  /*
  * You may set this property to "decimal", "currency", "percent" or "date". If you set it to "currency", you may use the currency property to display the value in currency different from USD.
  */
  get displayStyle(): string;
  set displayStyle(val: string);
  /*
  * Use it to display the value in the currency differen from USD. The displayStype should be set to "currency".
  */
  get currency(): string;
  set currency(val: string);
  /*
  * Determines whether to display grouping separators. The default value is true.
  */
  get useGrouping(): boolean;
  set useGrouping(val: boolean);
  protected getValueAsStr(val: any): string;
}
/*
* A Model for a file question
*/
export declare class QuestionFileModel extends Question {
  constructor(name: string);
  isUploading: boolean;
  isDragging: boolean;
  /*
  * The event is fired after question state has been changed.
  * sender the question object that fires the event
  * options.state new question state value.
  */
  onStateChanged: EventBase<QuestionFileModel>;
  previewValue: any;
  currentState: string;
  indexToShow: number;
  containsMultiplyFiles: boolean;
  mobileFileNavigator: any;
  prevFileAction: Action;
  nextFileAction: Action;
  fileIndexAction: Action;
  get mobileFileNavigatorVisible(): boolean;
  protected updateElementCssCore(cssClasses: any): void;
  isPreviewVisible(index: number): boolean;
  getType(): string;
  clearOnDeletingContainer(): void;
  /*
  * Set it to true, to show the preview for the image files.
  */
  get showPreview(): boolean;
  set showPreview(val: boolean);
  /*
  * Set it to true, to allow select multiple files.
  */
  get allowMultiple(): boolean;
  set allowMultiple(val: boolean);
  /*
  * The image height.
  */
  get imageHeight(): string;
  set imageHeight(val: string);
  /*
  * The image width.
  */
  get imageWidth(): string;
  set imageWidth(val: string);
  /*
  * Accepted file types. Passed to the 'accept' attribute of the file input tag. See https://www.w3schools.com/tags/att_input_accept.asp for more details.
  */
  get acceptedTypes(): string;
  set acceptedTypes(val: string);
  /*
  * Set it to false if you do not want to serialize file content as text in the survey.data.
  * In this case, you have to write the code onUploadFiles event to store the file content.
  */
  get storeDataAsText(): boolean;
  set storeDataAsText(val: boolean);
  /*
  * Set it to true if you want to wait until files will be uploaded to your server.
  */
  get waitForUpload(): boolean;
  set waitForUpload(val: boolean);
  /*
  * Set it to false if you want to disable images preview.
  */
  get allowImagesPreview(): boolean;
  set allowImagesPreview(val: boolean);
  /*
  * Use this property to setup the maximum allowed file size.
  */
  get maxSize(): number;
  set maxSize(val: number);
  /*
  * Use this property to setup confirmation to remove file.
  */
  get needConfirmRemoveFile(): boolean;
  set needConfirmRemoveFile(val: boolean);
  /*
  * The remove file confirmation message.
  */
  getConfirmRemoveMessage(fileName: string): string;
  /*
  * The remove file confirmation message template.
  */
  get confirmRemoveMessage(): string;
  set confirmRemoveMessage(val: string);
  get locConfirmRemoveMessage(): LocalizableString;
  /*
  * The remove all files confirmation message.
  */
  get confirmRemoveAllMessage(): string;
  set confirmRemoveAllMessage(val: string);
  get locConfirmRemoveAllMessage(): LocalizableString;
  /*
  * The no file chosen caption for modern theme.
  */
  get noFileChosenCaption(): string;
  set noFileChosenCaption(val: string);
  get locNoFileChosenCaption(): LocalizableString;
  /*
  * The choose files button caption for modern theme.
  */
  get chooseButtonCaption(): string;
  set chooseButtonCaption(val: string);
  get locChooseButtonCaption(): LocalizableString;
  /*
  * The clean files button caption.
  */
  get cleanButtonCaption(): string;
  set cleanButtonCaption(val: string);
  get locCleanButtonCaption(): LocalizableString;
  /*
  * The remove file button caption.
  */
  get removeFileCaption(): string;
  set removeFileCaption(val: string);
  get locRemoveFileCaption(): LocalizableString;
  /*
  * The loading file input title.
  */
  get loadingFileTitle(): string;
  set loadingFileTitle(val: string);
  get locLoadingFileTitle(): LocalizableString;
  /*
  * The choose file input title.
  */
  get chooseFileTitle(): string;
  set chooseFileTitle(val: string);
  get locChooseFileTitle(): LocalizableString;
  get dragAreaPlaceholder(): string;
  set dragAreaPlaceholder(val: string);
  get locDragAreaPlaceholder(): LocalizableString;
  /*
  * The input title value.
  */
  get inputTitle(): string;
  /*
  * Clear value programmatically.
  */
  clear(doneCallback?: any): void;
  get multipleRendered(): string;
  get showRemoveButton(): any;
  get showRemoveButtonBottom(): any;
  defaultImage(data: any): boolean;
  get imageWidthRendered(): string;
  /*
  * Remove file item programmatically.
  */
  removeFile(content: any): void;
  /*
  * Load multiple files programmatically.
  */
  loadFiles(files: any): void;
  canPreviewImage(fileItem: any): boolean;
  protected setQuestionValue(newValue: any, updateIsAnswered?: boolean): void;
  protected onCheckForErrors(errors: any, isOnValueChanged: boolean): void;
  protected stateChanged(state: string): void;
  getPlainData(options?: any): any;
  supportComment(): boolean;
  getChooseFileCss(): string;
  getReadOnlyFileCss(): string;
  get fileRootCss(): string;
  getFileDecoratorCss(): string;
  onDragOver: (event: any) => boolean;
  onDrop: (event: any) => void;
  onDragLeave: (event: any) => void;
  doChange: (event: any) => void;
  doClean: (event: any) => void;
  doRemoveFile(data: any): void;
  doDownloadFile: (event: any, data: any) => void;
}
export declare class QuestionImagePickerImplementor extends QuestionCheckboxBaseImplementor {
  constructor(question: any);
  protected getKoValue(): any;
}
/*
* A Model for a matrix base question.
*/
export declare class QuestionMatrixBaseModel<TRow, TColumn> extends Question {
  constructor(name: string);
  protected filteredColumns: any;
  protected filteredRows: any;
  protected generatedVisibleRows: any;
  protected generatedTotalRow: any;
  visibleRowsChangedCallback: any;
  protected createColumnValues(): any;
  getType(): string;
  endLoadingFromJson(): void;
  get isCompositeQuestion(): boolean;
  /*
  * Set this property to false, to hide table header. The default value is true.
  */
  get showHeader(): boolean;
  set showHeader(val: boolean);
  /*
  * The list of columns. A column has a value and an optional text
  */
  get columns(): any;
  set columns(val: any);
  get visibleColumns(): any;
  /*
  * The list of rows. A row has a value and an optional text
  */
  get rows(): any;
  set rows(val: any);
  protected processRowsOnSet(newRows: any): any;
  protected getVisibleRows(): Array<TRow>;
  /*
  * Returns the list of visible rows as model objects.
  */
  get visibleRows(): any;
  /*
  * An expression that returns true or false. It runs against each row item and if for this item it returns true, then the item is visible otherwise the item becomes invisible. Please use {item} to get the current item value in the expression.
  */
  get rowsVisibleIf(): string;
  set rowsVisibleIf(val: string);
  /*
  * An expression that returns true or false. It runs against each column item and if for this item it returns true, then the item is visible otherwise the item becomes invisible. Please use {item} to get the current item value in the expression.
  */
  get columnsVisibleIf(): string;
  set columnsVisibleIf(val: string);
  runCondition(values: any, properties: any): void;
  protected filterItems(): boolean;
  protected onColumnsChanged(): void;
  protected onRowsChanged(): void;
  protected updateVisibilityBasedOnRows(): void;
  protected shouldRunColumnExpression(): boolean;
  protected hasRowsAsItems(): boolean;
  protected runItemsCondition(values: any, properties: any): boolean;
  protected clearGeneratedRows(): void;
  clearIncorrectValues(): void;
  protected clearInvisibleValuesInRows(): void;
  needResponsiveWidth(): boolean;
  getTableCss(): string;
  /*
  * Aligns matrix cell content in the vertical direction.
  */
  verticalAlign: "top" | "middle";
  /*
  * Specifies whether to apply shading to alternate matrix rows.
  */
  alternateRows: boolean;
}
/*
* A Model for a multiple text question.
*/
export declare class QuestionMultipleTextModel extends Question implements IMultipleTextData, IPanel {
  constructor(name: string);
  static addDefaultItems(question: QuestionMultipleTextModel): void;
  colCountChangedCallback: any;
  getType(): string;
  setSurveyImpl(value: ISurveyImpl, isLight?: boolean): void;
  get isAllowTitleLeft(): boolean;
  get hasSingleInput(): boolean;
  onSurveyLoad(): void;
  setQuestionValue(newValue: any, updateIsAnswered?: boolean): void;
  onSurveyValueChanged(newValue: any): void;
  /*
  * The list of input items.
  */
  get items(): any;
  set items(val: any);
  /*
  * Add a new text item.
  */
  addItem(name: string, title?: string): MultipleTextItemModel;
  getItemByName(name: string): MultipleTextItemModel;
  addConditionObjectsByContext(objects: any, context: any): void;
  getConditionJson(operator?: string, path?: string): any;
  locStrsChanged(): void;
  supportGoNextPageAutomatic(): boolean;
  /*
  * The number of columns. Items are rendred in one line if the value is 0.
  */
  get colCount(): number;
  set colCount(val: number);
  /*
  * The default text input size.
  */
  get itemSize(): number;
  set itemSize(val: number);
  /*
  * Returns the list of rendered rows.
  */
  getRows(): Array<any>;
  isMultipleItemValueChanging: boolean;
  protected onValueChanged(): void;
  protected createTextItem(name: string, title: string): MultipleTextItemModel;
  protected onItemValueChanged(): void;
  protected getIsRunningValidators(): boolean;
  hasErrors(fireCallback?: boolean, rec?: any): boolean;
  getAllErrors(): Array<SurveyError>;
  clearErrors(): void;
  protected getContainsErrors(): boolean;
  protected getIsAnswered(): boolean;
  getProgressInfo(): IProgressInfo;
  protected getDisplayValueCore(keysAsText: boolean, value: any): any;
  getMultipleTextValue(name: string): any;
  setMultipleTextValue(name: string, value: any): void;
  getItemDefaultValue(name: string): any;
  getTextProcessor(): ITextProcessor;
  getAllValues(): any;
  getIsRequiredText(): string;
  addElement(element: IElement, index: number): void;
  removeElement(element: IElement): boolean;
  getQuestionTitleLocation(): string;
  getQuestionStartIndex(): string;
  getChildrenLayoutType(): string;
  elementWidthChanged(el: IElement): void;
  get elements(): any;
  indexOf(el: IElement): number;
  ensureRowsVisibility(): void;
  getItemLabelCss(item: MultipleTextItemModel): string;
  getItemCss(): string;
  getItemTitleCss(): string;
}
/*
* A Model for non value question. This question doesn't add any new functionality. It hides some properties, including the value.
*/
export declare class QuestionNonValue extends Question {
  constructor(name: string);
  getType(): string;
  get hasInput(): boolean;
  get hasTitle(): boolean;
  getTitleLocation(): string;
  get hasComment(): boolean;
  hasErrors(fireCallback?: boolean, rec?: any): boolean;
  getAllErrors(): Array<SurveyError>;
  supportGoNextPageAutomatic(): boolean;
  addConditionObjectsByContext(objects: any, context: any): void;
  getConditionJson(operator?: string, path?: string): any;
}
/*
* A Model for a panel dymanic question. You setup the template panel, but adding elements (any question or a panel) and assign a text to it's title, and this panel will be used as a template on creating dynamic panels. The number of panels is defined by panelCount property.
* An end-user may dynamically add/remove panels, unless you forbidden this.
*/
export declare class QuestionPanelDynamicModel extends Question implements IQuestionPanelDynamicData {
  constructor(name: string);
  templateValue: PanelModel;
  loadingPanelCount: number;
  isValueChangingInternally: boolean;
  changingValueQuestion: Question;
  currentIndexValue: number;
  renderModeChangedCallback: any;
  panelCountChangedCallback: any;
  currentIndexChangedCallback: any;
  get hasSingleInput(): boolean;
  getFirstQuestionToFocus(withError: boolean): Question;
  setSurveyImpl(value: ISurveyImpl, isLight?: boolean): void;
  getType(): string;
  get isCompositeQuestion(): boolean;
  clearOnDeletingContainer(): void;
  get isAllowTitleLeft(): boolean;
  removeElement(element: IElement): boolean;
  /*
  * The template Panel. This panel is used as a template on creatign dynamic panels
  */
  get template(): PanelModel;
  getPanel(): IPanel;
  /*
  * The template Panel elements, questions and panels.
  */
  get templateElements(): any;
  /*
  * The template Panel title property.
  */
  get templateTitle(): string;
  set templateTitle(val: string);
  get locTemplateTitle(): LocalizableString;
  /*
  * The template Panel description property.
  */
  get templateDescription(): string;
  set templateDescription(val: string);
  get locTemplateDescription(): LocalizableString;
  protected get items(): any;
  /*
  * The array of dynamic panels created based on panel template
  */
  get panels(): any;
  /*
  * The index of current active dynamical panel when the renderMode is not "list". If there is no dymamic panel (panelCount = 0) or renderMode equals "list" it returns -1, otherwise it returns a value from 0 to panelCount - 1.
  */
  get currentIndex(): number;
  set currentIndex(val: number);
  /*
  * The current active dynamical panel when the renderMode is not "list". If there is no dymamic panel (panelCount = 0) or renderMode equals "list" it returns null.
  */
  get currentPanel(): PanelModel;
  /*
  * Set it to true, to show a confirmation dialog on removing a panel
  */
  get confirmDelete(): boolean;
  set confirmDelete(val: boolean);
  /*
  * Set it to a question name used in the template panel and the library shows duplication error, if there are same values in different panels of this question.
  */
  get keyName(): string;
  set keyName(val: string);
  /*
  * Use this property to change the default text showing in the confirmation delete dialog on removing a panel.
  */
  get confirmDeleteText(): string;
  set confirmDeleteText(val: string);
  get locConfirmDeleteText(): LocalizableString;
  /*
  * The duplication value error text. Set it to show the text different from the default.
  */
  get keyDuplicationError(): string;
  set keyDuplicationError(val: string);
  get locKeyDuplicationError(): LocalizableString;
  /*
  * Use this property to change the default previous button text. Previous button shows the previous panel, change the currentPanel, when the renderMode doesn't equal to "list".
  */
  get panelPrevText(): string;
  set panelPrevText(val: string);
  get locPanelPrevText(): LocalizableString;
  /*
  * Use this property to change the default next button text. Next button shows the next panel, change the currentPanel, when the renderMode doesn't equal to "list".
  */
  get panelNextText(): string;
  set panelNextText(val: string);
  get locPanelNextText(): LocalizableString;
  /*
  * Use this property to change the default value of add panel button text.
  */
  get panelAddText(): string;
  set panelAddText(val: string);
  get locPanelAddText(): LocalizableString;
  /*
  * Use this property to change the default value of remove panel button text.
  */
  get panelRemoveText(): string;
  set panelRemoveText(val: string);
  get locPanelRemoveText(): LocalizableString;
  /*
  * Returns true when the renderMode equals to "progressTop" or "progressTopBottom"
  */
  get isProgressTopShowing(): boolean;
  /*
  * Returns true when the renderMode equals to "progressBottom" or "progressTopBottom"
  */
  get isProgressBottomShowing(): boolean;
  /*
  * Returns true when currentIndex is more than 0.
  */
  get isPrevButtonShowing(): boolean;
  /*
  * Returns true when currentIndex is more than or equal 0 and less than panelCount - 1.
  */
  get isNextButtonShowing(): boolean;
  /*
  * Returns true when showRangeInProgress equals to true, renderMode doesn't equal to "list" and panelCount is >= 2.
  */
  get isRangeShowing(): boolean;
  getElementsInDesign(includeHidden?: boolean): Array<IElement>;
  isAddingNewPanels: boolean;
  addingNewPanelsValue: any;
  isNewPanelsValueChanged: boolean;
  protected getValueCore(): any;
  protected setValueCore(newValue: any): void;
  /*
  * Use this property to get/set the number of dynamic panels.
  */
  get panelCount(): number;
  set panelCount(val: number);
  /*
  * Use this property to allow the end-user to collapse/expand the panels. It works only if the renderMode property equals to "list" and templateTitle property is not empty. The following values are available:
  * default - the default value. User can't collapse/expand panels
  * expanded - User can collapse/expand panels and all panels are expanded by default
  * collapsed - User can collapse/expand panels and all panels are collapsed by default
  * firstExpanded - User can collapse/expand panels. The first panel is expanded and others are collapsed
  */
  get panelsState(): string;
  set panelsState(val: string);
  /*
  * The minimum panel count. A user could not delete a panel if the panelCount equals to minPanelCount
  */
  get minPanelCount(): number;
  set minPanelCount(val: number);
  /*
  * The maximum panel count. A user could not add a panel if the panelCount equals to maxPanelCount
  */
  get maxPanelCount(): number;
  set maxPanelCount(val: number);
  /*
  * Set this property to false to hide the 'Add New' button
  */
  get allowAddPanel(): boolean;
  set allowAddPanel(val: boolean);
  /*
  * Set this property to false to hide the 'Remove' button
  */
  get allowRemovePanel(): boolean;
  set allowRemovePanel(val: boolean);
  /*
  * Set this property different from "default" to set the specific question title location for the template questions.
  */
  get templateTitleLocation(): string;
  set templateTitleLocation(val: string);
  /*
  * Use this property to show/hide the numbers in titles in questions inside a dynamic panel.
  * By default the value is "off". You may set it to "onPanel" and the first question inside a dynamic panel will start with 1 or "onSurvey" to include nested questions in dymamic panels into global survey question numbering.
  */
  get showQuestionNumbers(): string;
  set showQuestionNumbers(val: string);
  /*
  * Use this property to change the location of the remove button relative to the panel.
  * By default the value is "bottom". You may set it to "right" and remove button will appear to the right of the panel.
  */
  get panelRemoveButtonLocation(): string;
  set panelRemoveButtonLocation(val: string);
  /*
  * Shows the range from 1 to panelCount when renderMode doesn't equal to "list". Set to false to hide this element.
  */
  get showRangeInProgress(): boolean;
  set showRangeInProgress(val: boolean);
  /*
  * By default the property equals to "list" and all dynamic panels are rendered one by one on the page. You may change it to: "progressTop", "progressBottom" or "progressTopBottom" to render only one dynamic panel at once. The progress and navigation elements can be rendred on top, bottom or both.
  */
  get renderMode(): string;
  set renderMode(val: string);
  /*
  * Returns true when renderMode equals to "list".
  */
  get isRenderModeList(): boolean;
  setVisibleIndex(value: number): number;
  /*
  * Returns true when an end user may add a new panel. The question is not read only and panelCount less than maxPanelCount
  * and renderMode is "list" or the current panel doesn't have any errors
  */
  get canAddPanel(): boolean;
  /*
  * Returns true when an end user may remove a panel. The question is not read only and panelCount is more than minPanelCount
  */
  get canRemovePanel(): boolean;
  protected rebuildPanels(): void;
  /*
  * If it is not empty, then this value is set to every new panel, including panels created initially, unless the defaultValue is not empty
  */
  get defaultPanelValue(): any;
  set defaultPanelValue(val: any);
  /*
  * Set it to true to copy the value into new added panel from the last panel. If defaultPanelValue is set and this property equals to true,
  * then the value for new added panel is merging.
  */
  get defaultValueFromLastPanel(): boolean;
  set defaultValueFromLastPanel(val: boolean);
  protected isDefaultValueEmpty(): boolean;
  protected setDefaultValue(): void;
  isEmpty(): boolean;
  getProgressInfo(): IProgressInfo;
  /*
  * Add a new dynamic panel based on the template Panel. It checks if canAddPanel returns true and then calls addPanel method.
  * If a renderMode is different from "list" and the current panel has erros, then
  */
  addPanelUI(): PanelModel;
  /*
  * Add a new dynamic panel based on the template Panel.
  */
  addPanel(): PanelModel;
  /*
  * Call removePanel function. Do nothing is canRemovePanel returns false. If confirmDelete set to true, it shows the confirmation dialog first.
  */
  removePanelUI(value: any): void;
  /*
  * Goes to the next panel in the PanelDynamic
  * Returns true, if it can move to the next panel. It can return false if the renderMode is "list" or the current panel has errors.
  */
  goToNextPanel(): boolean;
  /*
  * Goes to the previous panel in the PanelDynamic
  */
  goToPrevPanel(): void;
  /*
  * Removes a dynamic panel from the panels array.
  */
  removePanel(value: any): void;
  locStrsChanged(): void;
  clearIncorrectValues(): void;
  clearErrors(): void;
  getQuestionFromArray(name: string, index: number): IQuestion;
  getSharedQuestionFromArray(name: string, panelIndex: number): Question;
  addConditionObjectsByContext(objects: any, context: any): void;
  getConditionJson(operator?: string, path?: string): any;
  protected onReadOnlyChanged(): void;
  onSurveyLoad(): void;
  onFirstRendering(): void;
  localeChanged(): void;
  runCondition(values: any, properties: any): void;
  protected runPanelsCondition(values: any, properties: any): void;
  onAnyValueChanged(name: string): void;
  hasErrors(fireCallback?: boolean, rec?: any): boolean;
  protected getContainsErrors(): boolean;
  protected getIsAnswered(): boolean;
  protected clearValueIfInvisibleCore(): void;
  protected getIsRunningValidators(): boolean;
  getAllErrors(): Array<SurveyError>;
  protected getDisplayValueCore(keysAsText: boolean, value: any): any;
  protected createNewPanel(): PanelModel;
  protected createAndSetupNewPanelObject(): PanelModel;
  protected createNewPanelObject(): PanelModel;
  setQuestionValue(newValue: any): void;
  onSurveyValueChanged(newValue: any): void;
  protected onSetData(): void;
  getItemIndex(item: ISurveyData): number;
  getPanelItemData(item: ISurveyData): any;
  isSetPanelItemData: any;
  setPanelItemData(item: ISurveyData, name: string, val: any): void;
  getRootData(): ISurveyData;
  getPlainData(options?: any): any;
  updateElementCss(reNew?: boolean): void;
  get progressText(): string;
  get progress(): string;
  getRootCss(): string;
  getPanelWrapperCss(): string;
  getPanelRemoveButtonCss(): string;
  getAddButtonCss(): string;
  getPrevButtonCss(): string;
  getNextButtonCss(): string;
  /*
  * A text displayed when the dynamic panel contains no entries. Applies only in the Default V2 theme.
  */
  get noEntriesText(): string;
  set noEntriesText(val: string);
  get locNoEntriesText(): LocalizableString;
  getShowNoEntriesPlaceholder(): boolean;
  needResponsiveWidth(): boolean;
  footerToolbarValue: any;
  get footerToolbar(): any;
  legacyNavigation: boolean;
  updateFooterActionsCallback: any;
}
/*
* A Model for a rating question.
*/
export declare class QuestionRatingModel extends Question {
  constructor(name: string);
  rateValuesChangedCallback: any;
  endLoadingFromJson(): void;
  onSurveyLoad(): void;
  /*
  * The list of rate items. Every item has value and text. If text is empty, the value is rendered. The item text supports markdown. If it is empty the array is generated by using rateMin, rateMax and rateStep properties.
  */
  get rateValues(): any;
  set rateValues(val: any);
  /*
  * This property is used to generate rate values if rateValues array is empty. It is the first value in the rating. The default value is 1.
  */
  get rateMin(): number;
  set rateMin(val: number);
  /*
  * This property is used to generate rate values if rateValues array is empty. It is the last value in the rating. The default value is 5.
  */
  get rateMax(): number;
  set rateMax(val: number);
  /*
  * This property is used to generate rate values if rateValues array is empty. It is the step value. The number of rate values are (rateMax - rateMin) / rateStep. The default value is 1.
  */
  get rateStep(): number;
  set rateStep(val: number);
  protected getDisplayValueCore(keysAsText: boolean, value: any): any;
  get visibleRateValues(): any;
  get renderedRateItems(): any;
  getType(): string;
  protected getFirstInputElementId(): string;
  getInputId(index: number): string;
  supportGoNextPageAutomatic(): boolean;
  supportComment(): boolean;
  supportOther(): boolean;
  /*
  * The description of minimum (first) item.
  */
  get minRateDescription(): string;
  set minRateDescription(val: string);
  get locMinRateDescription(): LocalizableString;
  /*
  * The description of maximum (last) item.
  */
  get maxRateDescription(): string;
  set maxRateDescription(val: string);
  get locMaxRateDescription(): LocalizableString;
  hasMinRateDescription: boolean;
  hasMaxRateDescription: boolean;
  get hasMinLabel(): boolean;
  get hasMaxLabel(): boolean;
  /*
  * Specifies whether a Rating question displays the [minRateDescription](https://surveyjs.io/Documentation/Library?id=questionratingmodel#minRateDescription) and [maxRateDescription](https://surveyjs.io/Documentation/Library?id=questionratingmodel#maxRateDescription) property texts as buttons that correspond to the extreme (first and last) rate items. If any of these properties is empty, the corresponding rate item's value/text is used for display.
  * When the `displayRateDescriptionsAsExtremeItems` property is disabled, the texts defined through the [minRateDescription](https://surveyjs.io/Documentation/Library?id=questionratingmodel#minRateDescription) and [maxRateDescription](https://surveyjs.io/Documentation/Library?id=questionratingmodel#maxRateDescription) properties are displayed as plain non-clickable texts.
  */
  displayRateDescriptionsAsExtremeItems: boolean;
  useDropdown: "auto" | "always" | "never";
  protected valueToData(val: any): any;
  /*
  * Click value again to clear.
  */
  setValueFromClick(value: any): void;
  get ratingRootCss(): string;
  getItemClass(item: ItemValue): string;
  getControlClass(): string;
  get placeholder(): string;
  set placeholder(val: string);
  get locPlaceholder(): LocalizableString;
  get allowClear(): boolean;
  get renderedValue(): boolean;
  set renderedValue(val: boolean);
  get visibleChoices(): any;
  get readOnlyText(): any;
  needResponsiveWidth(): boolean;
  protected supportResponsiveness(): boolean;
  protected getCompactRenderAs(): string;
  protected getDesktopRenderAs(): string;
}
/*
* It is a base class for checkbox, dropdown and radiogroup questions.
*/
export declare class QuestionSelectBase extends Question {
  constructor(name: string);
  visibleChoicesChangedCallback: any;
  loadedChoicesFromServerCallback: any;
  filteredChoicesValue: any;
  conditionChoicesVisibleIfRunner: ConditionRunner;
  conditionChoicesEnableIfRunner: ConditionRunner;
  commentValue: string;
  prevCommentValue: string;
  otherItemValue: ItemValue;
  choicesFromUrl: any;
  cachedValueForUrlRequests: any;
  isChoicesLoaded: boolean;
  enableOnLoadingChoices: boolean;
  dependedQuestions: any;
  noneItemValue: ItemValue;
  newItemValue: ItemValue;
  canShowOptionItemCallback: (item: ItemValue) => boolean;
  getType(): string;
  dispose(): void;
  protected getItemValueType(): string;
  createItemValue(value: any): ItemValue;
  supportGoNextPageError(): boolean;
  isLayoutTypeSupported(layoutType: string): boolean;
  localeChanged(): void;
  locStrsChanged(): void;
  /*
  * Returns the other item. By using this property, you may change programmatically it's value and text.
  */
  get otherItem(): ItemValue;
  /*
  * Returns true if a user select the 'other' item.
  */
  get isOtherSelected(): boolean;
  /*
  * Set this property to true, to show the "None" item on the bottom. If end-user checks this item, all other items would be unchecked.
  */
  get hasNone(): boolean;
  set hasNone(val: boolean);
  /*
  * Returns the none item. By using this property, you may change programmatically it's value and text.
  */
  get noneItem(): ItemValue;
  /*
  * Use this property to set the different text for none item.
  */
  get noneText(): string;
  set noneText(val: string);
  get locNoneText(): LocalizableString;
  /*
  * An expression that returns true or false. It runs against each choices item and if for this item it returns true, then the item is visible otherwise the item becomes invisible. Please use {item} to get the current item value in the expression.
  */
  get choicesVisibleIf(): string;
  set choicesVisibleIf(val: string);
  /*
  * An expression that returns true or false. It runs against each choices item and if for this item it returns true, then the item is enabled otherwise the item becomes disabled. Please use {item} to get the current item value in the expression.
  */
  get choicesEnableIf(): string;
  set choicesEnableIf(val: string);
  surveyChoiceItemVisibilityChange(): void;
  runCondition(values: any, properties: any): void;
  protected isTextValue(): boolean;
  isSettingDefaultValue: boolean;
  protected setDefaultValue(): void;
  protected getIsMultipleValue(): boolean;
  protected convertDefaultValue(val: any): any;
  protected filterItems(): boolean;
  protected runItemsCondition(values: any, properties: any): boolean;
  protected runItemsEnableCondition(values: any, properties: any): any;
  protected onAfterRunItemsEnableCondition(): void;
  protected onEnableItemCallBack(item: ItemValue): boolean;
  changeItemVisisbility(): (item: ItemValue, val: boolean) => boolean;
  protected getHasOther(val: any): boolean;
  get validatedValue(): any;
  protected createRestful(): ChoicesRestful;
  get autoOtherMode(): boolean;
  set autoOtherMode(val: boolean);
  protected getQuestionComment(): string;
  protected selectOtherValueFromComment(val: boolean): void;
  isSettingComment: boolean;
  protected setQuestionComment(newValue: string): void;
  clearValue(): void;
  updateCommentFromSurvey(newValue: any): any;
  get renderedValue(): any;
  set renderedValue(val: any);
  protected setQuestionValue(newValue: any, updateIsAnswered?: boolean, updateComment?: boolean): void;
  protected setNewValue(newValue: any): void;
  protected valueFromData(val: any): any;
  protected rendredValueFromData(val: any): any;
  protected rendredValueToData(val: any): any;
  protected renderedValueFromDataCore(val: any): any;
  protected rendredValueToDataCore(val: any): any;
  protected hasUnknownValue(val: any, includeOther?: boolean, isFilteredChoices?: boolean, checkEmptyValue?: boolean): boolean;
  protected isValueDisabled(val: any): boolean;
  /*
  * If the clearIncorrectValuesCallback is set, it is used to clear incorrect values instead of default behaviour.
  */
  clearIncorrectValuesCallback: any;
  /*
  * Use this property to fill the choices from a RESTful service.
  */
  get choicesByUrl(): ChoicesRestful;
  set choicesByUrl(val: ChoicesRestful);
  /*
  * The list of items. Every item has value and text. If text is empty, the value is rendered. The item text supports markdown.
  */
  get choices(): any;
  set choices(val: any);
  /*
  * Set this property to get choices from the specified question instead of defining them in the current question. This avoids duplication of choices declaration in your survey definition.
  * By setting this property, the "choices", "choicesVisibleIf", "choicesEnableIf" and "choicesOrder" properties become invisible, because these question characteristics depend on actions in another (specified) question.
  * Use the `choicesFromQuestionMode` property to filter choices obtained from the specified question.
  */
  get choicesFromQuestion(): string;
  set choicesFromQuestion(val: string);
  /*
  * This property becomes visible when the `choicesFromQuestion` property is selected. The default value is "all" (all visible choices from another question are displayed as they are).
  * You can set this property to "selected" or "unselected" to display only selected or unselected choices from the specified question.
  */
  get choicesFromQuestionMode(): string;
  set choicesFromQuestionMode(val: string);
  /*
  * Set this property to true to hide the question if there is no visible choices.
  */
  get hideIfChoicesEmpty(): boolean;
  set hideIfChoicesEmpty(val: boolean);
  get keepIncorrectValues(): boolean;
  set keepIncorrectValues(val: boolean);
  /*
  * Please use survey.storeOthersAsComment to change the behavior on the survey level. This property is depricated and invisible in Survey Creator.
  * By default the entered text in the others input in the checkbox/radiogroup/dropdown are stored as "question name " + "-Comment". The value itself is "question name": "others". Set this property to false, to store the entered text directly in the "question name" key.
  * Possible values are: "default", true, false
  */
  get storeOthersAsComment(): any;
  set storeOthersAsComment(val: any);
  protected hasOtherChanged(): void;
  /*
  * Use this property to render items in a specific order: "asc", "desc", "random". Default value is "none".
  */
  get choicesOrder(): string;
  set choicesOrder(val: string);
  /*
  * Use this property to set the different text for other item.
  */
  get otherText(): string;
  set otherText(val: string);
  get locOtherText(): LocalizableString;
  /*
  * Displays the "Select All", "None", and "Other" choices on individual rows.
  */
  separateSpecialChoices: boolean;
  /*
  * Use this property to set the place holder text for other or comment field  .
  */
  get otherPlaceHolder(): string;
  set otherPlaceHolder(val: string);
  get locOtherPlaceHolder(): LocalizableString;
  /*
  * The text that shows when the other item is choosed by the other input is empty.
  */
  get otherErrorText(): string;
  set otherErrorText(val: string);
  get locOtherErrorText(): LocalizableString;
  /*
  * The list of items as they will be rendered. If needed items are sorted and the other item is added.
  */
  get visibleChoices(): any;
  /*
  * The list of enabled items as they will be rendered. The disabled items are not included
  */
  get enabledChoices(): any;
  protected updateVisibleChoices(): void;
  protected canUseFilteredChoices(): boolean;
  setCanShowOptionItemCallback(func: (item: ItemValue) => boolean): void;
  get newItem(): ItemValue;
  protected addToVisibleChoices(items: any, isAddAll: boolean): void;
  protected canShowOptionItem(item: ItemValue, isAddAll: boolean, hasItem: boolean): boolean;
  /*
  * For internal use in SurveyJS Creator V2.
  */
  isItemInList(item: ItemValue): boolean;
  protected get isAddDefaultItems(): boolean;
  getPlainData(options?: any): any;
  /*
  * Returns the text for the current value. If the value is null then returns empty string. If 'other' is selected then returns the text for other value.
  */
  protected getDisplayValueCore(keysAsText: boolean, value: any): any;
  protected getDisplayValueEmpty(): string;
  protected getChoicesDisplayValue(items: any, val: any): any;
  protected getDisplayArrayValue(keysAsText: boolean, value: any, onGetValueCallback?: (index: number) => any): string;
  protected get activeChoices(): any;
  protected getChoicesFromQuestion(question: QuestionSelectBase): Array<ItemValue>;
  protected get hasActiveChoices(): boolean;
  protected isHeadChoice(item: ItemValue, question: QuestionSelectBase): boolean;
  protected isFootChoice(item: ItemValue, question: QuestionSelectBase): boolean;
  protected isBuiltInChoice(item: ItemValue, question: QuestionSelectBase): boolean;
  protected getChoices(): Array<ItemValue>;
  supportComment(): boolean;
  supportOther(): boolean;
  supportNone(): boolean;
  protected isSupportProperty(propName: string): boolean;
  protected onCheckForErrors(errors: any, isOnValueChanged: boolean): void;
  setSurveyImpl(value: ISurveyImpl, isLight?: boolean): void;
  protected setSurveyCore(value: ISurvey): void;
  getStoreOthersAsComment(): boolean;
  onSurveyLoad(): void;
  onAnyValueChanged(name: string): void;
  updateValueFromSurvey(newValue: any): void;
  protected getCommentFromValue(newValue: any): string;
  protected setOtherValueIntoValue(newValue: any): any;
  isRunningChoices: boolean;
  isFirstLoadChoicesFromUrl: boolean;
  protected onBeforeSendRequest(): void;
  protected onLoadChoicesFromUrl(array: any): void;
  isUpdatingChoicesDependedQuestions: boolean;
  protected updateChoicesDependedQuestions(): void;
  onSurveyValueChanged(newValue: any): void;
  protected onVisibleChoicesChanged(): void;
  clearIncorrectValues(): void;
  protected hasValueToClearIncorrectValues(): boolean;
  protected clearValueIfInvisibleCore(): void;
  /*
  * Returns true if item is selected
  */
  isItemSelected(item: ItemValue): boolean;
  protected isItemSelectedCore(item: ItemValue): boolean;
  protected clearIncorrectValuesCore(): void;
  protected canClearValueAnUnknow(val: any): boolean;
  protected clearDisabledValuesCore(): void;
  clearUnusedValues(): void;
  getColumnClass(): string;
  getItemIndex(item: any): number;
  getItemClass(item: any): string;
  protected getCurrentColCount(): number;
  protected getItemClassCore(item: any, options: any): string;
  getLabelClass(item: ItemValue): string;
  getControlLabelClass(item: ItemValue): string;
  get headItems(): any;
  get footItems(): any;
  get dataChoices(): any;
  get bodyItems(): any;
  get hasHeadItems(): boolean;
  get hasFootItems(): boolean;
  get columns(): any;
  get hasColumns(): boolean;
  get rowLayout(): boolean;
  get blockedRow(): boolean;
  choicesLoaded(): void;
  getItemValueWrapperComponentName(item: ItemValue): string;
  getItemValueWrapperComponentData(item: ItemValue): any;
  ariaItemChecked(item: ItemValue): "true" | "false";
  isOtherItem(item: ItemValue): boolean;
  get itemSvgIcon(): string;
  getSelectBaseRootCss(): string;
  getAriaItemLabel(item: ItemValue): string;
  getItemId(item: ItemValue): string;
  get questionName(): string;
  getItemEnabled(item: ItemValue): any;
  protected rootElement: any;
  afterRender(el: any): void;
  prevIsOtherSelected: boolean;
  protected onValueChanged(): void;
}
/*
* A Model for signature pad question.
*/
export declare class QuestionSignaturePadModel extends Question {
  constructor(name: string);
  isDrawingValue: boolean;
  protected getCssRoot(cssClasses: any): string;
  protected updateValue(): void;
  getType(): string;
  afterRenderQuestionElement(el: any): void;
  beforeDestroyQuestionElement(el: any): void;
  initSignaturePad(el: any): void;
  destroySignaturePad(el: any): void;
  /*
  * Use it to set the specific dataFormat for the signature pad image data.
  * formats: "" (default) - png, "image/jpeg" - jpeg, "image/svg+xml" - svg
  */
  dataFormat: string;
  /*
  * Use it to set the specific width for the signature pad.
  */
  get signatureWidth(): number;
  set signatureWidth(val: number);
  /*
  * Use it to set the specific height for the signature pad.
  */
  get signatureHeight(): number;
  set signatureHeight(val: number);
  get height(): number;
  set height(val: number);
  /*
  * Use it to clear content of the signature pad.
  */
  get allowClear(): boolean;
  set allowClear(val: boolean);
  get canShowClearButton(): boolean;
  /*
  * Use it to set pen color for the signature pad.
  */
  get penColor(): string;
  set penColor(val: string);
  /*
  * Use it to set background color for the signature pad.
  */
  get backgroundColor(): string;
  set backgroundColor(val: string);
  /*
  * The clear signature button caption.
  */
  get clearButtonCaption(): string;
  needShowPlaceholder(): boolean;
  get placeHolderText(): string;
  endLoadingFromJson(): void;
}
/*
* A Base Model for a comment and text questions
*/
export declare class QuestionTextBase extends Question {
  constructor(name: string);
  protected isTextValue(): boolean;
  /*
  * The maximum text length. If it is -1, defaul value, then the survey maxTextLength property will be used.
  * If it is 0, then the value is unlimited
  */
  get maxLength(): number;
  set maxLength(val: number);
  getMaxLength(): any;
  /*
  * Use this property to set the input place holder.
  */
  get placeholder(): string;
  set placeholder(val: string);
  get locPlaceholder(): LocalizableString;
  get placeHolder(): string;
  set placeHolder(val: string);
  get locPlaceHolder(): LocalizableString;
  getType(): string;
  isEmpty(): boolean;
  /*
  * Gets or sets a value that specifies how the question updates it's value.
  * 
  * The following options are available:
  * - `default` - get the value from survey.textUpdateMode
  * - `onBlur` - the value is updated after an input loses the focus.
  * - `onTyping` - update the value of text questions, "text" and "comment", on every key press.
  * 
  * Note, that setting to "onTyping" may lead to a performance degradation, in case you have many expressions in the survey.
  */
  get textUpdateMode(): string;
  set textUpdateMode(val: string);
  get isSurveyInputTextUpdate(): boolean;
  get renderedPlaceholder(): string;
  protected setRenderedPlaceholder(val: string): void;
  protected onReadOnlyChanged(): void;
  onSurveyLoad(): void;
  localeChanged(): void;
  protected calcRenderedPlaceholder(): void;
  protected hasPlaceHolder(): boolean;
  getControlClass(): string;
  get ariaRole(): string;
}
/*
* The flow panel object. It is a container with flow layout where you can mix questions with markdown text.
*/
export declare class FlowPanelModel extends PanelModel {
  constructor(name?: string);
  static contentElementNamePrefix: string;
  contentChangedCallback: any;
  onGetHtmlForQuestion: (question: Question) => string;
  onCustomHtmlProducing: any;
  getType(): string;
  getChildrenLayoutType(): string;
  onSurveyLoad(): any;
  get content(): string;
  set content(val: string);
  get locContent(): LocalizableString;
  get html(): string;
  set html(val: string);
  protected onContentChanged(): any;
  produceHtml(): string;
  getQuestionFromText(str: string): Question;
  protected getHtmlForQuestion(question: Question): string;
  protected getQuestionHtmlId(question: Question): string;
  protected onAddElement(element: IElement, index: number): void;
  protected onRemoveElement(element: IElement): void;
  dragDropMoveElement(src: IElement, target: IElement, targetIndex: number): void;
  getElementContentText(element: IElement): string;
}
export declare class Page extends PageModel {
  constructor(name?: string);
  _implementor: ImplementorBase;
  protected onBaseCreating(): void;
  protected createRow(): QuestionRowModel;
  protected onCreating(): void;
  protected onNumChanged(value: number): void;
  dispose(): void;
}
export declare class Panel extends PanelModel {
  constructor(name?: string);
  _implementor: ImplementorBase;
  koElementType: any;
  koCss: any;
  koErrorClass: any;
  protected onBaseCreating(): void;
  protected createRow(): QuestionRowModel;
  protected onCreating(): void;
  protected onNumChanged(value: number): void;
  dispose(): void;
}
export declare class QuestionBoolean extends QuestionBooleanModel {
  constructor(name: string);
  _implementor: QuestionImplementor;
  protected onBaseCreating(): void;
  onSwitchClick(data: any, event: any): any;
  onTrueLabelClick(data: any, event: any): any;
  onFalseLabelClick(data: any, event: any): any;
  onKeyDown(data: any, event: any): boolean;
  dispose(): void;
}
/*
* A base class for checkbox and radiogroup questions. It introduced a colCount property.
*/
export declare class QuestionCheckboxBase extends QuestionSelectBase {
  constructor(name: string);
  colCountChangedCallback: any;
  /*
  * The number of columns for radiogroup and checkbox questions. Items are rendred in one line if the value is 0.
  */
  get colCount(): number;
  set colCount(val: number);
  protected onParentChanged(): void;
  protected onParentQuestionChanged(): void;
  protected getSearchableItemValueKeys(keys: any): void;
}
/*
* A Model for a comment question
*/
export declare class QuestionCommentModel extends QuestionTextBase {
  constructor(name: string);
  element: any;
  /*
  * The html rows attribute.
  */
  get rows(): number;
  set rows(val: number);
  /*
  * The html cols attribute.
  */
  get cols(): number;
  set cols(val: number);
  /*
  * Accepts pressing the Enter key by end-users and accepts carriage return symbols - \n - in the question value assigned.
  */
  get acceptCarriageReturn(): boolean;
  set acceptCarriageReturn(val: boolean);
  /*
  * Specifies whether the question's text area automatically expands its height to avoid the vertical scrollbar and to display the entire multi-line contents entered by respondents.
  * Default value is false.
  */
  get autoGrow(): boolean;
  set autoGrow(val: boolean);
  getType(): string;
  afterRenderQuestionElement(el: any): void;
  updateElement(): void;
  onInput(event: any): void;
  onKeyDown(event: any): void;
  onValueChanged(): void;
  protected setNewValue(newValue: string): any;
  get className(): string;
}
export declare class QuestionCompositeModel extends QuestionCustomModelBase {
  constructor(name: string, customQuestion: ComponentQuestionJSON);
  customQuestion: ComponentQuestionJSON;
  static ItemVariableName: string;
  panelWrapper: PanelModel;
  textProcessing: QuestionCompositeTextProcessor;
  protected createWrapper(): void;
  getTemplate(): string;
  protected getElement(): SurveyElement;
  protected getCssRoot(cssClasses: any): string;
  get contentPanel(): PanelModel;
  hasErrors(fireCallback?: boolean, rec?: any): boolean;
  updateElementCss(reNew?: boolean): void;
  getTextProcessor(): ITextProcessor;
  protected clearValueIfInvisibleCore(): void;
  onAnyValueChanged(name: string): void;
  protected createPanel(): PanelModel;
  protected onReadOnlyChanged(): void;
  onSurveyLoad(): void;
  setVisibleIndex(val: number): number;
  runCondition(values: any, properties: any): void;
  getValue(name: string): any;
  settingNewValue: boolean;
  setValue(name: string, newValue: any, locNotification: any, allowNotifyValueChanged?: boolean): any;
  addConditionObjectsByContext(objects: any, context: any): void;
  protected convertDataValue(name: string, newValue: any): any;
  protected setQuestionValue(newValue: any, updateIsAnswered?: boolean): void;
  protected getDisplayValueCore(keyAsText: boolean, value: any): any;
}
export declare class QuestionCustomModel extends QuestionCustomModelBase {
  constructor(name: string, customQuestion: ComponentQuestionJSON);
  customQuestion: ComponentQuestionJSON;
  questionWrapper: Question;
  getTemplate(): string;
  protected createWrapper(): void;
  protected getElement(): SurveyElement;
  onAnyValueChanged(name: string): void;
  hasErrors(fireCallback?: boolean, rec?: any): boolean;
  focus(onError?: boolean): void;
  get contentQuestion(): Question;
  protected createQuestion(): Question;
  onSurveyLoad(): void;
  runCondition(values: any, properties: any): void;
  protected convertDataName(name: string): string;
  protected convertDataValue(name: string, newValue: any): any;
  protected canSetValueToSurvey(): boolean;
  protected setQuestionValue(newValue: any, updateIsAnswered?: boolean): void;
  onSurveyValueChanged(newValue: any): void;
  protected getValueCore(): any;
  protected initElement(el: SurveyElement): void;
  updateElementCss(reNew?: boolean): void;
  protected updateElementCssCore(cssClasses: any): void;
  protected getDisplayValueCore(keyAsText: boolean, value: any): any;
}
/*
* A Model for a dropdown question
*/
export declare class QuestionDropdownModel extends QuestionSelectBase {
  constructor(name: string);
  dropdownListModel: DropdownListModel;
  get showOptionsCaption(): boolean;
  set showOptionsCaption(val: boolean);
  get optionsCaption(): string;
  set optionsCaption(val: string);
  /*
  * A text displayed in the input field when it doesn't have a value.
  */
  get placeholder(): string;
  set placeholder(val: string);
  get locPlaceholder(): LocalizableString;
  getType(): string;
  get selectedItem(): ItemValue;
  supportGoNextPageAutomatic(): boolean;
  minMaxChoices: any;
  protected getChoices(): Array<ItemValue>;
  /*
  * Use this and choicesMax property to automatically add choices. For example choicesMin = 1 and choicesMax = 10 will generate ten additional choices from 1 to 10.
  */
  get choicesMin(): number;
  set choicesMin(val: number);
  /*
  * Use this and choicesMax property to automatically add choices. For example choicesMin = 1 and choicesMax = 10 will generate ten additional choices from 1 to 10.
  */
  get choicesMax(): number;
  set choicesMax(val: number);
  /*
  * The default value is 1. It tells the value of the iterator between choicesMin and choicesMax properties.
  * If choicesMin = 10, choicesMax = 30 and choicesStep = 10 then you will have only three additional choices: [10, 20, 30].
  */
  get choicesStep(): number;
  set choicesStep(val: number);
  /*
  * Dropdown auto complete
  */
  get autoComplete(): string;
  set autoComplete(val: string);
  /*
  * Specifies whether to display a button that clears the selected value.
  */
  allowClear: boolean;
  /*
  * The name of a component used to render drop-down menu items.
  */
  itemComponent: string;
  /*
  * Specifies whether users can enter a value into the input field to filter the drop-down list.
  */
  searchEnabled: boolean;
  /*
  * The clean files button caption.
  */
  get cleanButtonCaption(): string;
  set cleanButtonCaption(val: string);
  get locCleanButtonCaption(): LocalizableString;
  getControlClass(): string;
  get readOnlyText(): string;
  get popupModel(): any;
  onOpened: EventBase<QuestionDropdownModel>;
  onOpenedCallBack(): void;
  protected onVisibleChoicesChanged(): void;
  protected getFirstInputElementId(): string;
  getInputId(): string;
  onClick(e: any): void;
  onKeyUp(event: any): void;
}
export declare class QuestionEmpty extends QuestionEmptyModel {
  constructor(name: string);
  _implementor: QuestionImplementor;
  protected onBaseCreating(): void;
  dispose(): void;
}
export declare class QuestionExpression extends QuestionExpressionModel {
  constructor(name: string);
  _implementor: QuestionImplementor;
  protected onBaseCreating(): void;
  dispose(): void;
}
export declare class QuestionFile extends QuestionFileModel {
  constructor(name: string);
  _implementor: QuestionFileImplementor;
  protected onBaseCreating(): void;
  dispose(): void;
}
/*
* A Model for html question. Unlike other questions it doesn't have value and title.
*/
export declare class QuestionHtmlModel extends QuestionNonValue {
  constructor(name: string);
  ignoreHtmlProgressing: boolean;
  getType(): string;
  get isCompositeQuestion(): boolean;
  getProcessedText(text: string): string;
  /*
  * Set html to display it
  */
  get html(): string;
  set html(val: string);
  get locHtml(): LocalizableString;
  get processedHtml(): string;
}
/*
* A Model for image question. This question hasn't any functionality and can be used to improve the appearance of the survey.
*/
export declare class QuestionImageModel extends QuestionNonValue {
  constructor(name: string);
  getType(): string;
  get isCompositeQuestion(): boolean;
  onSurveyLoad(): void;
  /*
  * The image URL.
  */
  get imageLink(): string;
  set imageLink(val: string);
  get locImageLink(): LocalizableString;
  /*
  * The image alt text.
  */
  get text(): string;
  set text(val: string);
  get locText(): LocalizableString;
  /*
  * The image height.
  */
  get imageHeight(): string;
  set imageHeight(val: string);
  get renderedHeight(): string;
  /*
  * The image width.
  */
  get imageWidth(): string;
  set imageWidth(val: string);
  get renderedWidth(): string;
  /*
  * The image fit mode.
  */
  get imageFit(): string;
  set imageFit(val: string);
  /*
  * The content mode.
  */
  get contentMode(): string;
  set contentMode(val: string);
  /*
  * The rendered mode.
  */
  get renderedMode(): string;
  getImageCss(): string;
  protected calculateRenderedMode(): void;
}
/*
* A base class for matrix dropdown and matrix dynamic questions.
*/
export declare class QuestionMatrixDropdownModelBase extends QuestionMatrixBaseModel<MatrixDropdownRowModelBase, MatrixDropdownColumn> implements IMatrixDropdownData {
  constructor(name: string);
  static get defaultCellType(): string;
  static set defaultCellType(val: string);
  static addDefaultColumns(matrix: QuestionMatrixDropdownModelBase): void;
  detailPanelValue: PanelModel;
  isUniqueCaseSensitiveValue: boolean;
  protected isRowChanging: boolean;
  columnsChangedCallback: any;
  onRenderedTableResetCallback: any;
  onRenderedTableCreatedCallback: (table: QuestionMatrixDropdownRenderedTable) => void;
  onCellCreatedCallback: (options: any) => void;
  onCellValueChangedCallback: (options: any) => void;
  onHasDetailPanelCallback: (row: MatrixDropdownRowModelBase) => boolean;
  onCreateDetailPanelCallback: (row: MatrixDropdownRowModelBase, panel: PanelModel) => void;
  onCreateDetailPanelRenderedRowCallback: (renderedRow: QuestionMatrixDropdownRenderedRow) => void;
  onAddColumn: (column: MatrixDropdownColumn) => void;
  onRemoveColumn: (column: MatrixDropdownColumn) => void;
  protected createColumnValues(): any;
  /*
  * Returns the question type.
  * Possible values:
  * - [*"boolean"*](https://surveyjs.io/Documentation/Library?id=questionbooleanmodel)
  * - [*"checkbox"*](https://surveyjs.io/Documentation/Library?id=questioncheckboxmodel)
  * - [*"comment"*](https://surveyjs.io/Documentation/Library?id=questioncommentmodel)
  * - [*"dropdown"*](https://surveyjs.io/Documentation/Library?id=questiondropdownmodel)
  * - [*"expression"*](https://surveyjs.io/Documentation/Library?id=questionexpressionmodel)
  * - [*"file"*](https://surveyjs.io/Documentation/Library?id=questionfilemodel)
  * - [*"html"*](https://surveyjs.io/Documentation/Library?id=questionhtmlmodel)
  * - [*"image"*](https://surveyjs.io/Documentation/Library?id=questionimagemodel)
  * - [*"imagepicker"*](https://surveyjs.io/Documentation/Library?id=questionimagepickermodel)
  * - [*"matrix"*](https://surveyjs.io/Documentation/Library?id=questionmatrixmodel)
  * - [*"matrixdropdown"*](https://surveyjs.io/Documentation/Library?id=questionmatrixdropdownmodel)
  * - [*"matrixdynamic"*](https://surveyjs.io/Documentation/Library?id=questionmatrixdynamicmodel)
  * - [*"multipletext"*](https://surveyjs.io/Documentation/Library?id=questionmultipletextmodel)
  * - [*"panel"*](https://surveyjs.io/Documentation/Library?id=panelmodel)
  * - [*"paneldynamic"*](https://surveyjs.io/Documentation/Library?id=questionpaneldynamicmodel)
  * - [*"radiogroup"*](https://surveyjs.io/Documentation/Library?id=questionradiogroupmodel)
  * - [*"rating"*](https://surveyjs.io/Documentation/Library?id=questionratingmodel)
  * - [*"ranking"*](https://surveyjs.io/Documentation/Library?id=questionrankingmodel)
  * - [*"signaturepad"*](https://surveyjs.io/Documentation/Library?id=questionsignaturepadmodel)
  * - [*"text"*](https://surveyjs.io/Documentation/Library?id=questiontextmodel)
  */
  getType(): string;
  dispose(): void;
  get hasSingleInput(): boolean;
  get isRowsDynamic(): boolean;
  isUpdating: boolean;
  protected get isUpdateLocked(): boolean;
  beginUpdate(): void;
  endUpdate(): void;
  protected updateColumnsAndRows(): void;
  itemValuePropertyChanged(item: ItemValue, name: string, oldValue: any, newValue: any): void;
  /*
  * Set columnLayout to 'vertical' to place columns vertically and rows horizontally. It makes sense when we have many columns and few rows.
  */
  get columnLayout(): string;
  set columnLayout(val: string);
  get columnsLocation(): string;
  set columnsLocation(val: string);
  /*
  * Returns true if columns are located horizontally
  */
  get isColumnLayoutHorizontal(): boolean;
  /*
  * Set this property to true if you want to differ case sensitive values in unique columns, for example to allow enter "ABC" into the first row and "abc" into the second.
  * It doesn't allow by default.
  */
  get isUniqueCaseSensitive(): boolean;
  set isUniqueCaseSensitive(val: boolean);
  /*
  * Set the value to "underRow" to show the detailPanel under the row.
  */
  get detailPanelMode(): string;
  set detailPanelMode(val: string);
  /*
  * The detail template Panel. This panel is used as a template on creating detail panel for a row.
  */
  get detailPanel(): PanelModel;
  getPanel(): IPanel;
  /*
  * The template Panel elements, questions and panels.
  */
  get detailElements(): any;
  protected createNewDetailPanel(): PanelModel;
  get hasRowText(): boolean;
  getFooterText(): LocalizableString;
  get canAddRow(): boolean;
  get canRemoveRows(): boolean;
  canRemoveRow(row: MatrixDropdownRowModelBase): boolean;
  onPointerDown(pointerDownEvent: any, row: MatrixDropdownRowModelBase): void;
  protected onRowsChanged(): void;
  lockResetRenderedTable: boolean;
  protected onStartRowAddingRemoving(): void;
  protected onEndRowAdding(): void;
  protected onEndRowRemoving(row: MatrixDropdownRowModelBase): void;
  protected clearRowsAndResetRenderedTable(): void;
  protected resetRenderedTable(): void;
  protected clearGeneratedRows(): void;
  get renderedTable(): QuestionMatrixDropdownRenderedTable;
  protected createRenderedTable(): QuestionMatrixDropdownRenderedTable;
  protected onMatrixRowCreated(row: MatrixDropdownRowModelBase): void;
  /*
  * Use this property to change the default cell type.
  */
  get cellType(): string;
  set cellType(val: string);
  /*
  * The default column count for radiogroup and checkbox  cell types.
  */
  get columnColCount(): number;
  set columnColCount(val: number);
  /*
  * Minimum column width in CSS values.
  */
  get columnMinWidth(): string;
  set columnMinWidth(val: string);
  /*
  * Set this property to true to show the horizontal scroll.
  */
  get horizontalScroll(): boolean;
  set horizontalScroll(val: boolean);
  /*
  * The Matrix toolbar and inner panel toolbars get adaptive if the property is set to true.
  */
  get allowAdaptiveActions(): boolean;
  set allowAdaptiveActions(val: boolean);
  getRequiredText(): string;
  hasChoices(): boolean;
  onColumnPropertyChanged(column: MatrixDropdownColumn, name: string, newValue: any): void;
  onColumnItemValuePropertyChanged(column: MatrixDropdownColumn, propertyName: string, obj: ItemValue, name: string, newValue: any, oldValue: any): void;
  onShowInMultipleColumnsChanged(column: MatrixDropdownColumn): void;
  onColumnCellTypeChanged(column: MatrixDropdownColumn): void;
  getRowTitleWidth(): string;
  get hasFooter(): boolean;
  getAddRowLocation(): string;
  getShowColumnsIfEmpty(): boolean;
  protected updateShowTableAndAddRow(): void;
  protected updateHasFooter(): void;
  get hasTotal(): boolean;
  getCellType(): string;
  getCustomCellType(column: MatrixDropdownColumn, row: MatrixDropdownRowModelBase, cellType: string): string;
  getConditionJson(operator?: string, path?: string): any;
  clearIncorrectValues(): void;
  clearErrors(): void;
  localeChanged(): void;
  runCondition(values: any, properties: any): void;
  protected shouldRunColumnExpression(): boolean;
  protected runCellsCondition(values: any, properties: any): void;
  protected runTotalsCondition(values: any, properties: any): void;
  locStrsChanged(): void;
  /*
  * Returns the column by it's name. Returns null if a column with this name doesn't exist.
  */
  getColumnByName(columnName: string): MatrixDropdownColumn;
  getColumnName(columnName: string): MatrixDropdownColumn;
  /*
  * Returns the column width.
  */
  getColumnWidth(column: MatrixDropdownColumn): string;
  /*
  * The default choices for dropdown, checkbox and radiogroup cell types.
  */
  get choices(): any;
  set choices(val: any);
  /*
  * The default placeholder for dropdown cell type.
  */
  get placeholder(): string;
  set placeholder(val: string);
  get locPlaceholder(): LocalizableString;
  get optionsCaption(): string;
  set optionsCaption(val: string);
  /*
  * The duplication value error text. Set it to show the text different from the default.
  */
  get keyDuplicationError(): string;
  set keyDuplicationError(val: string);
  get locKeyDuplicationError(): LocalizableString;
  get storeOthersAsComment(): boolean;
  addColumn(name: string, title?: string): MatrixDropdownColumn;
  protected getVisibleRows(): Array<MatrixDropdownRowModelBase>;
  get totalValue(): any;
  protected getVisibleTotalRow(): MatrixDropdownRowModelBase;
  get visibleTotalRow(): MatrixDropdownRowModelBase;
  onSurveyLoad(): void;
  /*
  * Returns the row value. If the row value is empty, the object is empty: {}.
  */
  getRowValue(rowIndex: number): any;
  checkIfValueInRowDuplicated(checkedRow: MatrixDropdownRowModelBase, cellQuestion: Question): boolean;
  /*
  * Set the row value.
  */
  setRowValue(rowIndex: number, rowValue: any): any;
  protected generateRows(): Array<MatrixDropdownRowModelBase>;
  protected generateTotalRow(): MatrixDropdownRowModelBase;
  protected createNewValue(nullOnEmpty?: boolean): any;
  protected getRowValueCore(row: MatrixDropdownRowModelBase, questionValue: any, create?: boolean): any;
  protected getRowObj(row: MatrixDropdownRowModelBase): any;
  protected getRowDisplayValue(keysAsText: boolean, row: MatrixDropdownRowModelBase, rowValue: any): any;
  getPlainData(options?: any): any;
  addConditionObjectsByContext(objects: any, context: any): void;
  protected getConditionObjectRowName(index: number): string;
  protected getConditionObjectRowText(index: number): string;
  protected getConditionObjectsRowIndeces(): Array<any>;
  getProgressInfo(): IProgressInfo;
  protected updateProgressInfoByValues(res: IProgressInfo): void;
  protected updateProgressInfoByRow(res: IProgressInfo, rowValue: any): void;
  protected onBeforeValueChanged(val: any): void;
  protected setQuestionValue(newValue: any): void;
  supportGoNextPageAutomatic(): boolean;
  protected getContainsErrors(): boolean;
  protected getIsAnswered(): boolean;
  hasErrors(fireCallback?: boolean, rec?: any): boolean;
  protected getIsRunningValidators(): boolean;
  getAllErrors(): Array<SurveyError>;
  protected getUniqueColumns(): Array<MatrixDropdownColumn>;
  getFirstQuestionToFocus(withError: boolean): Question;
  protected getFirstInputElementId(): string;
  protected getFirstErrorInputElementId(): string;
  protected getFirstCellQuestion(onError: boolean): Question;
  protected onReadOnlyChanged(): void;
  createQuestion(row: MatrixDropdownRowModelBase, column: MatrixDropdownColumn): Question;
  protected createQuestionCore(row: MatrixDropdownRowModelBase, column: MatrixDropdownColumn): Question;
  protected deleteRowValue(newValue: any, row: MatrixDropdownRowModelBase): any;
  isDoingonAnyValueChanged: boolean;
  onAnyValueChanged(name: string): void;
  protected isObject(value: any): boolean;
  protected onCellValueChanged(row: MatrixDropdownRowModelBase, columnName: string, rowValue: any): void;
  validateCell(row: MatrixDropdownRowModelBase, columnName: string, rowValue: any): SurveyError;
  get isValidateOnValueChanging(): boolean;
  onRowChanging(row: MatrixDropdownRowModelBase, columnName: string, rowValue: any): any;
  onRowChanged(row: MatrixDropdownRowModelBase, columnName: string, newRowValue: any, isDeletingValue: boolean): void;
  getRowIndex(row: MatrixDropdownRowModelBase): number;
  getElementsInDesign(includeHidden?: boolean): Array<IElement>;
  hasDetailPanel(row: MatrixDropdownRowModelBase): boolean;
  getIsDetailPanelShowing(row: MatrixDropdownRowModelBase): boolean;
  setIsDetailPanelShowing(row: MatrixDropdownRowModelBase, val: boolean): void;
  getDetailPanelButtonCss(row: MatrixDropdownRowModelBase): string;
  getDetailPanelIconCss(row: MatrixDropdownRowModelBase): string;
  getDetailPanelIconId(row: MatrixDropdownRowModelBase): string;
  createRowDetailPanel(row: MatrixDropdownRowModelBase): PanelModel;
  getSharedQuestionByName(columnName: string, row: MatrixDropdownRowModelBase): Question;
  onTotalValueChanged(): any;
  getParentTextProcessor(): ITextProcessor;
  getQuestionFromArray(name: string, index: number): IQuestion;
  getCellTemplateData(cell: QuestionMatrixDropdownRenderedCell): any;
  getCellWrapperComponentName(cell: MatrixDropdownCell): string;
  getCellWrapperComponentData(cell: MatrixDropdownCell): any;
  getColumnHeaderWrapperComponentName(cell: MatrixDropdownCell): string;
  getColumnHeaderWrapperComponentData(cell: MatrixDropdownCell): any;
  getRowHeaderWrapperComponentName(cell: MatrixDropdownCell): string;
  getRowHeaderWrapperComponentData(cell: MatrixDropdownCell): any;
  get showHorizontalScroll(): boolean;
  getRootCss(): string;
}
/*
* A Model for a simple matrix question.
*/
export declare class QuestionMatrixModel extends QuestionMatrixBaseModel<MatrixRowModel, ItemValue> implements IMatrixData, IMatrixCellsOwner {
  constructor(name: string);
  isRowChanging: boolean;
  cellsValue: MatrixCells;
  getType(): string;
  get hasSingleInput(): boolean;
  /*
  * Set this property to true, if you want a user to answer all rows.
  */
  get isAllRowRequired(): boolean;
  set isAllRowRequired(val: boolean);
  /*
  * Returns true, if there is at least one row.
  */
  get hasRows(): boolean;
  /*
  * Use this property to render items in a specific order: "random" or "initial". Default is "initial".
  */
  get rowsOrder(): string;
  set rowsOrder(val: string);
  /*
  * Set this property to true to hide the question if there is no visible rows in the matrix.
  */
  get hideIfRowsEmpty(): boolean;
  set hideIfRowsEmpty(val: boolean);
  getRows(): Array<any>;
  getColumns(): Array<any>;
  addColumn(value: any, text?: string): ItemValue;
  getItemClass(row: any, column: any): string;
  get itemSvgIcon(): string;
  protected getQuizQuestionCount(): number;
  protected getCorrectAnswerCount(): number;
  protected getVisibleRows(): Array<MatrixRowModel>;
  protected sortVisibleRows(array: any): Array<MatrixRowModel>;
  endLoadingFromJson(): void;
  protected processRowsOnSet(newRows: any): any;
  /*
  * Returns the list of visible rows as model objects.
  */
  get visibleRows(): any;
  get cells(): MatrixCells;
  set cells(val: MatrixCells);
  get hasCellText(): boolean;
  protected updateHasCellText(): void;
  setCellText(row: any, column: any, val: string): void;
  getCellText(row: any, column: any): string;
  setDefaultCellText(column: any, val: string): void;
  getDefaultCellText(column: any): string;
  getCellDisplayText(row: any, column: any): string;
  emptyLocalizableString: LocalizableString;
  getCellDisplayLocText(row: any, column: any): LocalizableString;
  supportGoNextPageAutomatic(): boolean;
  protected onCheckForErrors(errors: any, isOnValueChanged: boolean): void;
  protected getIsAnswered(): boolean;
  protected onMatrixRowCreated(row: MatrixRowModel): void;
  protected setQuestionValue(newValue: any, updateIsAnswered?: boolean): void;
  protected getDisplayValueCore(keysAsText: boolean, value: any): any;
  getPlainData(options?: any): any;
  addConditionObjectsByContext(objects: any, context: any): void;
  getConditionJson(operator?: string, path?: string): any;
  protected clearValueIfInvisibleCore(): void;
  protected getFirstInputElementId(): string;
  onMatrixRowChanged(row: MatrixRowModel): void;
  getCorrectedRowValue(value: any): any;
  protected getSearchableItemValueKeys(keys: any): void;
  getColumnHeaderWrapperComponentName(cell: ItemValue): string;
  getColumnHeaderWrapperComponentData(cell: ItemValue): any;
  getRowHeaderWrapperComponentName(cell: ItemValue): string;
  getRowHeaderWrapperComponentData(cell: ItemValue): any;
}
export declare class QuestionMultipleText extends QuestionMultipleTextModel {
  constructor(name: string);
  _implementor: QuestionMultipleTextImplementor;
  koRows: any;
  protected onBaseCreating(): void;
  protected onColCountChanged(): void;
  protected createTextItem(name: string, title: string): MultipleTextItemModel;
  dispose(): void;
}
export declare class QuestionPanelDynamic extends QuestionPanelDynamicModel {
  constructor(name: string);
  _implementor: QuestionPanelDynamicImplementor;
  protected onBaseCreating(): void;
  dispose(): void;
}
export declare class QuestionRating extends QuestionRatingModel {
  constructor(name: string);
  _implementor: QuestionRatingImplementor;
  protected onBaseCreating(): void;
  dispose(): void;
}
export declare class QuestionSignaturePad extends QuestionSignaturePadModel {
  constructor(name: string);
  _implementor: QuestionImplementor;
  protected onBaseCreating(): void;
  dispose(): void;
}
/*
* A Model for an input text question.
*/
export declare class QuestionTextModel extends QuestionTextBase {
  constructor(name: string);
  locDataListValue: LocalizableStrings;
  minValueRunner: ExpressionRunner;
  maxValueRunner: ExpressionRunner;
  protected isTextValue(): boolean;
  getType(): string;
  onSurveyLoad(): void;
  /*
  * Use this property to change the default input type.
  */
  get inputType(): string;
  set inputType(val: string);
  runCondition(values: any, properties: any): void;
  getValidators(): Array<SurveyValidator>;
  isLayoutTypeSupported(layoutType: string): boolean;
  /*
  * The text input size
  */
  get size(): number;
  set size(val: number);
  get isTextInput(): boolean;
  get inputSize(): number;
  get renderedInputSize(): number;
  get inputWidth(): string;
  updateInputSize(): void;
  /*
  * Text auto complete
  */
  get autoComplete(): string;
  set autoComplete(val: string);
  /*
  * The minimum value
  */
  get min(): string;
  set min(val: string);
  /*
  * The maximum value
  */
  get max(): string;
  set max(val: string);
  /*
  * The minimum value that you can setup as expression, for example today(-1) = yesterday;
  */
  get minValueExpression(): string;
  set minValueExpression(val: string);
  /*
  * The maximum value that you can setup as expression, for example today(1) = tomorrow;
  */
  get maxValueExpression(): string;
  set maxValueExpression(val: string);
  get renderedMin(): any;
  get renderedMax(): any;
  /*
  * The text that shows when value is less than min property.
  */
  get minErrorText(): string;
  set minErrorText(val: string);
  get locMinErrorText(): LocalizableString;
  /*
  * The text that shows when value is greater than man property.
  */
  get maxErrorText(): string;
  set maxErrorText(val: string);
  get locMaxErrorText(): LocalizableString;
  /*
  * Readonly property that returns true if the current inputType allows to set min and max properties
  */
  get isMinMaxType(): boolean;
  protected onCheckForErrors(errors: any, isOnValueChanged: boolean): void;
  protected canSetValueToSurvey(): boolean;
  /*
  * The step value
  */
  get step(): string;
  set step(val: string);
  get renderedStep(): string;
  supportGoNextPageAutomatic(): boolean;
  supportGoNextPageError(): boolean;
  /*
  * The list of recommended options available to choose.
  */
  get dataList(): any;
  set dataList(val: any);
  get locDataList(): LocalizableStrings;
  get dataListId(): string;
  protected canRunValidators(isOnValueChanged: boolean): boolean;
  protected setNewValue(newValue: any): void;
  protected correctValueType(newValue: any): any;
  protected hasPlaceHolder(): boolean;
  isReadOnlyRenderDiv(): boolean;
  get inputStyle(): any;
}
export declare class FlowPanel extends FlowPanelModel {
  constructor(name?: string);
  koElementType: any;
  koElementAfterRender: any;
  placeHolder: string;
  protected onCreating(): void;
  protected getHtmlForQuestion(question: any): string;
}
/*
* A Model for a button group question.
*/
export declare class QuestionButtonGroupModel extends QuestionCheckboxBase {
  constructor(name: string);
  getType(): string;
  protected getItemValueType(): string;
  supportOther(): boolean;
}
/*
* A Model for a checkbox question
*/
export declare class QuestionCheckboxModel extends QuestionCheckboxBase {
  constructor(name: string);
  selectAllItemValue: ItemValue;
  invisibleOldValues: any;
  get ariaRole(): string;
  getType(): string;
  protected onCreating(): void;
  protected getFirstInputElementId(): string;
  /*
  * Set this property if you want to store the checkbox value as array of objects instead of array of values
  * For example: if "valuePropertyName" equals car, then instead of having ["Ford", "Tesla"], you will have [{car: "Ford"}, {car: "Tesla"}]
  */
  get valuePropertyName(): string;
  set valuePropertyName(val: string);
  getQuestionFromArray(name: string, index: number): IQuestion;
  /*
  * Returns the select all item. By using this property, you may change programmatically it's value and text.
  */
  get selectAllItem(): ItemValue;
  /*
  * Use this property to set the different text for Select All item.
  */
  get selectAllText(): string;
  set selectAllText(val: string);
  get locSelectAllText(): LocalizableString;
  /*
  * Set this property to true, to show the "Select All" item on the top. If end-user checks this item, then all items are checked.
  */
  get hasSelectAll(): boolean;
  set hasSelectAll(val: boolean);
  /*
  * Returns true if all items are selected
  */
  get isAllSelected(): boolean;
  set isAllSelected(val: boolean);
  /*
  * It will select all items, except other and none. If all items have been already selected then it will clear the value
  */
  toggleSelectAll(): void;
  /*
  * Select all items, except other and none.
  */
  selectAll(): void;
  /*
  * Returns true if item is checked
  */
  isItemSelectedCore(item: ItemValue): boolean;
  /*
  * Set this property different to 0 to limit the number of selected choices in the checkbox.
  */
  get maxSelectedChoices(): number;
  set maxSelectedChoices(val: number);
  /*
  * Return the selected items in the checkbox. Returns empty array if the value is empty
  */
  get selectedItems(): any;
  protected onEnableItemCallBack(item: ItemValue): boolean;
  protected onAfterRunItemsEnableCondition(): void;
  protected getItemClassCore(item: any, options: any): string;
  updateValueFromSurvey(newValue: any): void;
  protected setDefaultValue(): void;
  protected hasValueToClearIncorrectValues(): boolean;
  protected setNewValue(newValue: any): void;
  protected getIsMultipleValue(): boolean;
  protected getCommentFromValue(newValue: any): string;
  protected setOtherValueIntoValue(newValue: any): any;
  protected canUseFilteredChoices(): boolean;
  protected supportSelectAll(): boolean;
  protected addToVisibleChoices(items: any, isAddAll: boolean): void;
  protected isHeadChoice(item: ItemValue, question: QuestionSelectBase): boolean;
  /*
  * For internal use in SurveyJS Creator V2.
  */
  isItemInList(item: ItemValue): boolean;
  protected getDisplayValueCore(keysAsText: boolean, value: any): any;
  protected clearIncorrectValuesCore(): void;
  protected clearDisabledValuesCore(): void;
  isChangingValueOnClearIncorrect: boolean;
  getConditionJson(operator?: string, path?: string): any;
  isAnswerCorrect(): boolean;
  protected setDefaultValueWithOthers(): void;
  protected getHasOther(val: any): boolean;
  protected valueFromData(val: any): any;
  protected rendredValueFromData(val: any): any;
  protected rendredValueToData(val: any): any;
  protected convertValueFromObject(val: any): any;
  protected convertValueToObject(val: any): any;
  protected renderedValueFromDataCore(val: any): any;
  protected rendredValueToDataCore(val: any): any;
  protected selectOtherValueFromComment(val: boolean): void;
  get checkBoxSvgPath(): string;
}
export declare class QuestionComment extends QuestionCommentModel {
  constructor(name: string);
  _implementor: QuestionImplementor;
  protected onBaseCreating(): void;
  dispose(): void;
}
export declare class QuestionComposite extends QuestionCompositeModel {
  constructor(name: string, questionJSON: any);
  _implementor: QuestionImplementor;
  protected onBaseCreating(): void;
  dispose(): void;
}
export declare class QuestionCustom extends QuestionCustomModel {
  constructor(name: string, questionJSON: any);
  _implementor: QuestionImplementor;
  protected onBaseCreating(): void;
  dispose(): void;
}
export declare class QuestionDropdown extends QuestionDropdownModel {
  constructor(name: string);
  _implementor: QuestionDropdownImplementor;
  koDisableOption: any;
  protected onBaseCreating(): void;
  dispose(): void;
}
export declare class QuestionHtml extends QuestionHtmlModel {
  constructor(name: string);
  _implementor: QuestionImplementor;
  protected onBaseCreating(): void;
  dispose(): void;
}
export declare class QuestionImage extends QuestionImageModel {
  constructor(name: string);
  _implementor: QuestionImplementor;
  protected onBaseCreating(): void;
  dispose(): void;
}
/*
* A Model for a select image question.
*/
export declare class QuestionImagePickerModel extends QuestionCheckboxBase {
  constructor(name: string);
  getType(): string;
  supportGoNextPageAutomatic(): boolean;
  get hasSingleInput(): boolean;
  protected getItemValueType(): string;
  get isCompositeQuestion(): boolean;
  supportOther(): boolean;
  supportNone(): boolean;
  isAnswerCorrect(): boolean;
  /*
  * Multi select option. If set to true, then allows to select multiple images.
  */
  get multiSelect(): boolean;
  set multiSelect(val: boolean);
  /*
  * Returns true if item is checked
  */
  isItemSelected(item: ItemValue): boolean;
  clearIncorrectValues(): void;
  protected getDisplayValueCore(keysAsText: boolean, value: any): any;
  /*
  * Show label under the image.
  */
  get showLabel(): boolean;
  set showLabel(val: boolean);
  endLoadingFromJson(): void;
  protected getValueCore(): any;
  protected renderedValueFromDataCore(val: any): any;
  protected rendredValueToDataCore(val: any): any;
  /*
  * The image height.
  */
  get imageHeight(): number;
  set imageHeight(val: number);
  responsiveImageHeight: number;
  get renderedImageHeight(): string;
  /*
  * The image width.
  */
  get imageWidth(): number;
  set imageWidth(val: number);
  responsiveImageWidth: number;
  get renderedImageWidth(): string;
  /*
  * The image fit mode.
  */
  get imageFit(): string;
  set imageFit(val: string);
  /*
  * The content mode.
  */
  get contentMode(): string;
  set contentMode(val: string);
  protected convertDefaultValue(val: any): any;
  get inputType(): "checkbox" | "radio";
  protected isFootChoice(_item: ItemValue, _question: QuestionSelectBase): boolean;
  getSelectBaseRootCss(): string;
  isResponsiveValue: boolean;
  maxImageWidth: number;
  minImageWidth: number;
  maxImageHeight: number;
  minImageHeight: number;
  protected getObservedElementSelector(): string;
  protected supportResponsiveness(): boolean;
  protected needResponsiveness(): boolean;
  _width: number;
  onContentLoaded: (item: ImageItemValue, event: any) => void;
  responsiveColCount: number;
  protected getCurrentColCount(): number;
  protected processResponsiveness(_: number, availableWidth: number): boolean;
  gapBetweenItems: number;
  afterRender(el: any): void;
}
export declare class QuestionMatrix extends QuestionMatrixModel {
  constructor(name: string);
  _implementor: QuestionImplementor;
  koVisibleRows: any;
  koVisibleColumns: any;
  protected onBaseCreating(): void;
  protected onColumnsChanged(): void;
  protected onRowsChanged(): void;
  onSurveyLoad(): void;
  protected onMatrixRowCreated(row: any): void;
  protected getVisibleRows(): Array<MatrixRowModel>;
  dispose(): void;
}
/*
* A Model for a matrix dropdown question. You may use a dropdown, checkbox, radiogroup, text and comment questions as a cell editors.
*/
export declare class QuestionMatrixDropdownModel extends QuestionMatrixDropdownModelBase implements IMatrixDropdownData {
  constructor(name: string);
  getType(): string;
  /*
  * Set this property to show it on the first column for the total row.
  */
  get totalText(): string;
  set totalText(val: string);
  get locTotalText(): LocalizableString;
  getFooterText(): LocalizableString;
  /*
  * The column width for the first column, row title column.
  */
  get rowTitleWidth(): string;
  set rowTitleWidth(val: string);
  getRowTitleWidth(): string;
  /*
  * Set this property to true to hide the question if there is no visible rows in the matrix.
  */
  get hideIfRowsEmpty(): boolean;
  set hideIfRowsEmpty(val: boolean);
  protected getDisplayValueCore(keysAsText: boolean, value: any): any;
  protected getConditionObjectRowName(index: number): string;
  protected getConditionObjectRowText(index: number): string;
  protected getConditionObjectsRowIndeces(): Array<any>;
  protected setNewValue(newValue: any): void;
  clearIncorrectValues(): void;
  protected clearValueIfInvisibleCore(): void;
  protected generateRows(): Array<MatrixDropdownRowModel>;
  protected createMatrixRow(item: ItemValue, value: any): MatrixDropdownRowModel;
  protected getSearchableItemValueKeys(keys: any): void;
  protected updateProgressInfoByValues(res: IProgressInfo): void;
}
/*
* A Model for a matrix dymanic question. You may use a dropdown, checkbox, radiogroup, text and comment questions as a cell editors.
* An end-user may dynamically add/remove rows, unlike in matrix dropdown question.
*/
export declare class QuestionMatrixDynamicModel extends QuestionMatrixDropdownModelBase implements IMatrixDropdownData {
  constructor(name: string);
  onGetValueForNewRowCallBack: (sender: QuestionMatrixDynamicModel) => any;
  rowCounter: number;
  initialRowCount: number;
  setRowCountValueFromData: boolean;
  dragDropMatrixRows: DragDropMatrixRows;
  setSurveyImpl(value: ISurveyImpl, isLight?: boolean): void;
  draggedRow: MatrixDropdownRowModelBase;
  onPointerDown(pointerDownEvent: any, row: MatrixDropdownRowModelBase): void;
  startDragMatrixRow: (event: any, currentTarget: any) => void;
  getType(): string;
  get isRowsDynamic(): boolean;
  /*
  * Set it to true, to show a confirmation dialog on removing a row
  */
  get confirmDelete(): boolean;
  set confirmDelete(val: boolean);
  /*
  * Set it to a column name and the library shows duplication error, if there are same values in different rows in the column.
  */
  get keyName(): string;
  set keyName(val: string);
  /*
  * If it is not empty, then this value is set to every new row, including rows created initially, unless the defaultValue is not empty
  */
  get defaultRowValue(): any;
  set defaultRowValue(val: any);
  /*
  * Set it to true to copy the value into new added row from the last row. If defaultRowValue is set and this property equals to true,
  * then the value for new added row is merging.
  */
  get defaultValueFromLastRow(): boolean;
  set defaultValueFromLastRow(val: boolean);
  protected isDefaultValueEmpty(): boolean;
  protected valueFromData(val: any): any;
  protected setDefaultValue(): void;
  moveRowByIndex: (fromIndex: number, toIndex: number) => void;
  /*
  * The number of rows in the matrix.
  */
  get rowCount(): number;
  set rowCount(val: number);
  protected updateProgressInfoByValues(res: IProgressInfo): void;
  /*
  * Set this property to true, to allow rows drag and drop.
  */
  get allowRowsDragAndDrop(): boolean;
  set allowRowsDragAndDrop(val: boolean);
  get iconDragElement(): string;
  protected createRenderedTable(): QuestionMatrixDropdownRenderedTable;
  /*
  * The minimum row count. A user could not delete a row if the rowCount equals to minRowCount
  */
  get minRowCount(): number;
  set minRowCount(val: number);
  /*
  * The maximum row count. A user could not add a row if the rowCount equals to maxRowCount
  */
  get maxRowCount(): number;
  set maxRowCount(val: number);
  /*
  * Set this property to false to disable ability to add new rows. "Add new Row" button becomes invsible in UI
  */
  get allowAddRows(): boolean;
  set allowAddRows(val: boolean);
  /*
  * Set this property to false to disable ability to remove rows. "Remove" row buttons become invsible in UI
  */
  get allowRemoveRows(): boolean;
  set allowRemoveRows(val: boolean);
  /*
  * Returns true, if a new row can be added.
  */
  get canAddRow(): boolean;
  canRemoveRowsCallback: (allow: boolean) => boolean;
  /*
  * Returns true, if row can be removed.
  */
  get canRemoveRows(): boolean;
  canRemoveRow(row: MatrixDropdownRowModelBase): boolean;
  /*
  * Creates and add a new row and focus the cell in the first column.
  */
  addRowUI(): void;
  /*
  * Creates and add a new row.
  */
  addRow(): void;
  /*
  * Set this property to true to show detail panel immediately on adding a new row.
  */
  get detailPanelShowOnAdding(): boolean;
  set detailPanelShowOnAdding(val: boolean);
  protected hasRowsAsItems(): boolean;
  unbindValue(): void;
  protected isValueSurveyElement(val: any): boolean;
  /*
  * Removes a row by it's index. If confirmDelete is true, show a confirmation dialog
  */
  removeRowUI(value: any): void;
  isRequireConfirmOnRowDelete(index: number): boolean;
  /*
  * Removes a row by it's index.
  */
  removeRow(index: number): void;
  /*
  * Use this property to change the default text showing in the confirmation delete dialog on removing a row.
  */
  get confirmDeleteText(): string;
  set confirmDeleteText(val: string);
  get locConfirmDeleteText(): LocalizableString;
  /*
  * Use this property to change the default value of add row button text.
  */
  get addRowText(): string;
  set addRowText(val: string);
  get locAddRowText(): LocalizableString;
  /*
  * By default the 'Add Row' button is shown on bottom if columnLayout is horizontal and on top if columnLayout is vertical.
  * You may set it to "top", "bottom" or "topBottom" (to show on top and bottom).
  */
  get addRowLocation(): string;
  set addRowLocation(val: string);
  getAddRowLocation(): string;
  /*
  * Set this property to true to hide matrix columns when there is no any row.
  */
  get hideColumnsIfEmpty(): boolean;
  set hideColumnsIfEmpty(val: boolean);
  getShowColumnsIfEmpty(): boolean;
  /*
  * Use this property to change the default value of remove row button text.
  */
  get removeRowText(): string;
  set removeRowText(val: string);
  get locRemoveRowText(): LocalizableString;
  /*
  * Use this property to change the default value of remove row button text.
  */
  get emptyRowsText(): string;
  set emptyRowsText(val: string);
  get locEmptyRowsText(): LocalizableString;
  protected getDisplayValueCore(keysAsText: boolean, value: any): any;
  protected getConditionObjectRowName(index: number): string;
  protected getConditionObjectsRowIndeces(): Array<any>;
  supportGoNextPageAutomatic(): boolean;
  get hasRowText(): boolean;
  protected onCheckForErrors(errors: any, isOnValueChanged: boolean): void;
  protected getUniqueColumns(): Array<MatrixDropdownColumn>;
  protected generateRows(): Array<MatrixDynamicRowModel>;
  protected createMatrixRow(value: any): MatrixDynamicRowModel;
  protected onBeforeValueChanged(val: any): void;
  protected createNewValue(): any;
  protected deleteRowValue(newValue: any, row: MatrixDropdownRowModelBase): any;
  protected getRowValueCore(row: MatrixDropdownRowModelBase, questionValue: any, create?: boolean): any;
  getAddRowButtonCss(isEmptySection?: boolean): string;
  getRemoveRowButtonCss(): string;
  getRootCss(): string;
}
/*
* A Model for a radiogroup question.
*/
export declare class QuestionRadiogroupModel extends QuestionCheckboxBase {
  constructor(name: string);
  getType(): string;
  get ariaRole(): string;
  get titleAriaLabel(): string;
  protected getFirstInputElementId(): string;
  /*
  * Return the selected item in the radio group. Returns null if the value is empty
  */
  get selectedItem(): ItemValue;
  /*
  * Show "clear button" flag.
  */
  get showClearButton(): boolean;
  set showClearButton(val: boolean);
  get canShowClearButton(): boolean;
  get clearButtonCaption(): string;
  supportGoNextPageAutomatic(): boolean;
  get showClearButtonInContent(): boolean;
  protected getDefaultTitleActions(): Array<Action>;
}
export declare class QuestionText extends QuestionTextModel {
  constructor(name: string);
  _implementor: QuestionImplementor;
  protected onBaseCreating(): void;
  dispose(): void;
}
export declare class QuestionButtonGroup extends QuestionButtonGroupModel {
  constructor(name: string);
  _implementor: QuestionCheckboxBaseImplementor;
  protected onBaseCreating(): void;
  dispose(): void;
}
export declare class QuestionCheckbox extends QuestionCheckboxModel {
  constructor(name: string);
  koAllSelected: any;
  isAllSelectedUpdating: boolean;
  _implementor: QuestionCheckboxImplementor;
  protected onBaseCreating(): void;
  onSurveyValueChanged(newValue: any): void;
  protected onVisibleChoicesChanged(): void;
  protected updateAllSelected(): void;
  dispose(): void;
}
export declare class QuestionImagePicker extends QuestionImagePickerModel {
  constructor(name: string);
  _implementor: QuestionImagePickerImplementor;
  protected onBaseCreating(): void;
  dispose(): void;
}
export declare class QuestionMatrixDropdown extends QuestionMatrixDropdownModel {
  constructor(name: string);
  _implementor: QuestionImplementor;
  protected createRenderedTable(): QuestionMatrixDropdownRenderedTable;
  protected onBaseCreating(): void;
  dispose(): void;
}
export declare class QuestionMatrixDynamic extends QuestionMatrixDynamicModel {
  constructor(name: string);
  _implementor: QuestionMatrixDynamicImplementor;
  protected createRenderedTable(): QuestionMatrixDropdownRenderedTable;
  protected onBaseCreating(): void;
  dispose(): void;
}
export declare class QuestionRadiogroup extends QuestionRadiogroupModel {
  constructor(name: string);
  _implementor: QuestionCheckboxBaseImplementor;
  protected onBaseCreating(): void;
  dispose(): void;
}
/*
* A Model for a ranking question
*/
export declare class QuestionRankingModel extends QuestionCheckboxModel {
  constructor(name: string);
  domNode: any;
  getType(): string;
  get rootClass(): string;
  protected getItemClassCore(item: ItemValue, options: any): string;
  protected isItemCurrentDropTarget(item: ItemValue): boolean;
  get ghostPositionCssClass(): string;
  getNumberByIndex(index: number): string;
  setSurveyImpl(value: ISurveyImpl, isLight?: boolean): void;
  isAnswerCorrect(): boolean;
  onSurveyValueChanged(newValue: any): void;
  protected onVisibleChoicesChanged: any;
  localeChanged: any;
  get rankingChoices(): any;
  dragDropRankingChoices: DragDropRankingChoices;
  currentDropTarget: ItemValue;
  dropTargetNodeMove: string;
  endLoadingFromJson(): void;
  handlePointerDown: (event: any, choice: ItemValue, node: any) => void;
  afterRenderQuestionElement(el: any): void;
  beforeDestroyQuestionElement(el: any): void;
  handleKeydown: (event: any, choice: ItemValue) => void;
  protected supportSelectAll(): boolean;
  supportOther(): boolean;
  supportNone(): boolean;
  handleArrowUp: (index: number, choice: ItemValue) => void;
  handleArrowDown: (index: number, choice: ItemValue) => void;
  focusItem: (index: number) => void;
  setValue: any;
  protected getChoicesFromQuestion(question: QuestionSelectBase): Array<ItemValue>;
  setValueFromUI: any;
  syncNumbers: any;
  setGhostText: (text: string) => void;
  getIconHoverCss(): string;
  getIconFocusCss(): string;
  /*
  * For mobile devices. Set this property to false, to disable the "long tap" before drag start. Default is true.
  */
  get longTap(): boolean;
  set longTap(val: boolean);
}
/*
* A Model for a tagbox question
*/
export declare class QuestionTagboxModel extends QuestionCheckboxModel {
  constructor(name: string);
  dropdownListModel: DropdownMultiSelectListModel;
  get readOnlyText(): any;
  onSurveyLoad(): void;
  /*
  * Specifies whether to display a button that clears the selected value.
  */
  allowClear: boolean;
  /*
  * Specifies whether users can enter a value into the input field to filter the drop-down list.
  */
  searchEnabled: boolean;
  /*
  * The name of a component used to render drop-down menu items.
  */
  itemComponent: string;
  /*
  * Specifies whether to remove selected items from the drop-down list.
  */
  hideSelectedItems: boolean;
  /*
  * The clean files button caption.
  */
  get cleanButtonCaption(): string;
  set cleanButtonCaption(val: string);
  get locCleanButtonCaption(): LocalizableString;
  /*
  * A text displayed in the input field when it doesn't have a value.
  */
  get placeholder(): string;
  set placeholder(val: string);
  get locPlaceholder(): LocalizableString;
  getType(): string;
  get popupModel(): any;
  getControlClass(): string;
  onOpened: EventBase<QuestionTagboxModel>;
  onOpenedCallBack(): void;
  protected onVisibleChoicesChanged(): void;
  protected getFirstInputElementId(): string;
  getInputId(): string;
}
export declare class QuestionRanking extends QuestionRankingModel {
  _implementor: QuestionImplementor;
  protected onBaseCreating(): void;
  dispose(): void;
  koHandleKeydown: (data: any, event: any) => boolean;
  koHandlePointerDown: (data: any, event: any) => boolean;
}
export declare class QuestionTagbox extends QuestionTagboxModel {
  constructor(name: string);
  koAllSelected: any;
  isAllSelectedUpdating: boolean;
  _implementor: QuestionCheckboxBaseImplementor;
  protected onBaseCreating(): void;
  onSurveyValueChanged(newValue: any): void;
  protected onVisibleChoicesChanged(): void;
  protected updateAllSelected(): void;
  dispose(): void;
}
export declare function property(options?: any): (target: any, key: string) => void;
export declare function propertyArray(options?: IArrayPropertyDecoratorOptions): (target: any, key: string) => void;
export declare function unwrap<T>(value: any): T;
export declare function getSize(value: any): any;
export declare function doKey2ClickBlur(evt: any): void;
export declare function doKey2ClickUp(evt: any, options?: IAttachKey2clickOptions): void;
export declare function doKey2ClickDown(evt: any, options?: IAttachKey2clickOptions): void;
export declare function sanitizeEditableContent(element: any): void;
export declare function createDialogOptions(componentName: string, data: any, onApply: any, onCancel?: any, onHide?: any, onShow?: any, cssClass?: string, title?: string, displayMode?: "popup" | "overlay"): IDialogOptions;
export declare function createPopupModalViewModel(options: IDialogOptions): PopupBaseViewModel;
export declare function createDropdownActionModel(actionOptions: IAction, dropdownOptions: IActionDropdownPopupOptions, locOwner?: any): Action;
export declare function createDropdownActionModelAdvanced(actionOptions: IAction, listOptions: IListModel, popupOptions?: IPopupOptionsBase, locOwner?: any): Action;
export declare function getCurrecyCodes(): Array<any>;
export declare function checkLibraryVersion(ver: string, libraryName: string): void;
export declare function showModal(componentName: string, data: any, onApply: any, onCancel?: any, cssClass?: string, title?: string, displayMode?: "popup" | "overlay"): void;
export declare function showDialog(dialogOptions: any): void;
/*
* Global survey settings
*/
export declare var settings: {
  /*
  * Options for SurveyJS comparator. By default we trim strings and compare them as case insensitive. To change the behavior you can use following code:
  * settings.comparator.trimStrings = false; //"abc " will not equal to "abc". They are equal by default.
  * settings.comparator.caseSensitive = true; //"abc " will not equal to "Abc". They are equal by default.
  */
  comparator: {
    trimStrings: boolean,
    caseSensitive: boolean,
  },
  /*
  * Set this value to false, if you want to have UTC fuctions, for example setUTCHours inside our functions, like today.
  * By default it uses setHours function, with local date
  */
  useLocalTimeZone: boolean,
  /*
  * The prefix that uses to store the question comment, as "questionName + commentPrefix".
  * The default value is "-Comment"
  */
  commentPrefix: string,
  /*
  * Encode parameter on calling restful web API
  */
  webserviceEncodeParameters: boolean,
  /*
  * Cache the result for choices getting from web services. Set this property to false, to disable the caching.
  */
  useCachingForChoicesRestful: boolean,
  useCachingForChoicesRestfull: boolean,
  /*
  * SurveyJS web service API url
  */
  surveyServiceUrl: string,
  /*
  * separator that can allow to set value and text of ItemValue object in one string as: "value|text"
  */
  itemValueSeparator: string,
  /*
  * Set it to true to serialize itemvalue instance always as object even if text property is empty
  * const item = new Survey.ItemValue(5);
  * item.toJSON(); //will return {value: 5}, instead of 5 by default.
  */
  itemValueAlwaysSerializeAsObject: boolean,
  /*
  * Set it to true to serialize itemvalue text property, even if it is empty or equals to value
  * const item = new Survey.ItemValue("item1");
  * item.toJSON(); //will return {value: item1, text: "item1"}, instead of "item1" by default.
  */
  itemValueAlwaysSerializeText: boolean,
  /*
  * default locale name for localizable strings that uses during serialization, {"default": "My text", "de": "Mein Text"}
  */
  defaultLocaleName: string,
  /*
  * Default row name for matrix (single choice)
  */
  matrixDefaultRowName: string,
  /*
  * Default cell type for dropdown and dynamic matrices
  */
  matrixDefaultCellType: string,
  /*
  * Total value postfix for dropdown and dynamic matrices. The total value stores as: {matrixName} + {postfix}
  */
  matrixTotalValuePostFix: string,
  /*
  * Maximum row count in dynamic matrix
  */
  matrixMaximumRowCount: number,
  /*
  * Maximum rowCount that returns in addConditionObjectsByContext function
  */
  matrixMaxRowCountInCondition: number,
  /*
  * Set this property to false, to render matrix dynamic remove action as button.
  * It is rendered as icon in new themes ("defaultV2") by default.
  */
  matrixRenderRemoveAsIcon: boolean,
  /*
  * Maximum panel count in dynamic panel
  */
  panelMaximumPanelCount: number,
  /*
  * Maximum rate value count in rating question
  */
  ratingMaximumRateValueCount: number,
  /*
  * Disable the question while choices are getting from the web service
  */
  disableOnGettingChoicesFromWeb: boolean,
  /*
  * Set to true to always serialize the localization string as object even if there is only one value for default locale. Instead of string "MyStr" serialize as {default: "MyStr"}
  */
  serializeLocalizableStringAsObject: boolean,
  /*
  * Set to false to hide empty page title and description in design mode
  */
  allowShowEmptyTitleInDesignMode: boolean,
  /*
  * Set to false to hide empty page description in design mode
  */
  allowShowEmptyDescriptionInDesignMode: boolean,
  /*
  * Set this property to true to execute the complete trigger on value change instead of on next page.
  */
  executeCompleteTriggerOnValueChanged: boolean,
  /*
  * Set this property to false to execute the skip trigger on next page instead of on value change.
  */
  executeSkipTriggerOnValueChanged: boolean,
  /*
  * Specifies how the input field of [Comment](https://surveyjs.io/Documentation/Library?id=questioncommentmodel) questions is rendered in the read-only mode.
  * Available values:
  * "textarea" (default) - A 'textarea' element is used to render a Comment question's input field.
  * "div" - A 'div' element is used to render a Comment question's input field.
  */
  readOnlyCommentRenderMode: string,
  /*
  * Specifies how the input field of [Text](https://surveyjs.io/Documentation/Library?id=questiontextmodel) questions is rendered in the read-only mode.
  * Available values:
  * "input" (default) - An 'input' element is used to render a Text question's input field.
  * "div" - A 'div' element is used to render a Text question's input field.
  */
  readOnlyTextRenderMode: string,
  /*
  * Override this function, set your function, if you want to show your own dialog confirm window instead of standard browser window.
  */
  confirmActionFunc: (message: string) => boolean,
  /*
  * Set this property to change the default value of the minWidth constraint
  */
  minWidth: string,
  /*
  * Set this property to change the default value of the maxWidth constraint
  */
  maxWidth: string,
  /*
  * This property tells how many times survey re-run expressions on value changes during condition running. We need it to avoid recursions in the expressions
  */
  maximumConditionRunCountOnValueChanged: number,
  /*
  * By default visibleIndex for question with titleLocation = "hidden" is -1, and survey doesn't count these questions when set questions numbers.
  * Set it true, and a question next to a question with hidden title will increase it's number.
  */
  setQuestionVisibleIndexForHiddenTitle: boolean,
  /*
  * By default visibleIndex for question with hideNumber = true is -1, and survey doesn't count these questions when set questions numbers.
  * Set it true, and a question next to a question with hidden title number will increase it's number.
  */
  setQuestionVisibleIndexForHiddenNumber: boolean,
  /*
  * By default all rows are rendered no matters whwther they are visible.
  * Set it true, and survey markup rows will be rendered only if they are visible in viewport.
  * This feature is experimantal and might do not support all the use cases.
  */
  lazyRowsRendering: boolean,
  lazyRowsRenderingStartRow: number,
  /*
  * By default checkbox and radiogroup items are ordered in rows.
  * Set it "column", and items will be ordered in columns.
  */
  showItemsInOrder: string,
  /*
  * Supported validators by question types. You can modify this variable to add validators for new question types or add/remove for existing question types.
  */
  supportedValidators: {
    question: any,
    comment: any,
    text: any,
    checkbox: any,
    imagepicker: any,
  },
  /*
  * Set the value as string "yyyy-mm-dd". text questions with inputType "date" will not allow to set to survey date that less than this value
  */
  minDate: string,
  /*
  * Set the value as string "yyyy-mm-dd". text questions with inputType "date" will not allow to set to survey date that greater than this value
  */
  maxDate: string,
  showModal: any,
  supportCreatorV2: boolean,
  showDefaultItemsInCreatorV2: boolean,
  /*
  * Specifies a list of custom icons.
  * Use this property to replace SurveyJS default icons (displayed in UI elements of SurveyJS Library or Creator) with your custom icons.
  * For every default icon to replace, add a key/value object with the default icon's name as a key and the name of your custom icon as a value.
  * For example: Survey.settings.customIcons["icon-redo"] = "my-own-redo-icon"
  */
  customIcons: any,
  titleTags: {
    survey: string,
    page: string,
    panel: string,
    question: string,
  },
  questions: {
    inputTypes: any,
    dataList: any,
  },
};
export declare var surveyLocalization: {
  currentLocaleValue: string,
  defaultLocaleValue: string,
  locales: any,
  localeNames: any,
  supportedLocales: any,
  currentLocale: string,
  defaultLocale: string,
  getLocaleStrings: (loc: string) => any,
  getCurrentStrings: (locale?: string) => any,
  getString: (strName: string, locale?: string) => any,
  getLocales: (removeDefaultLoc?: boolean) => any,
  onGetExternalString: (name: string, locale: string) => string,
};
export declare var surveyStrings: any;
/*
* An alias for the metadata object. It contains object properties' runtime information and allows you to modify it.
*/
export declare var Serializer: JsonMetadata;
export declare var surveyBuiltInVarible: string;
export declare var registerFunction: (name: string, func: any) => any;
export declare var parse: any;
export declare var keyFocusedClassName: any;
export declare var defaultActionBarCss: {
  root: string,
  defaultSizeMode: string,
  smallSizeMode: string,
  item: string,
  itemActive: string,
  itemPressed: string,
  itemIcon: string,
  itemTitle: string,
  itemTitleWithIcon: string,
};
export declare var defaultListCss: {
  root: string,
  item: string,
  itemSelected: string,
  itemWithIcon: string,
  itemDisabled: string,
  itemFocused: string,
  itemIcon: string,
  itemSeparator: string,
  itemBody: string,
  itemsContainer: string,
  filter: string,
  filterIcon: string,
  filterInput: string,
  emptyContainer: string,
  emptyText: string,
};
export declare var FOCUS_INPUT_SELECTOR: any;
export declare var surveyCss: {
  currentType: string,
  getCss: any,
};
export declare var defaultStandardCss: {
  root: string,
  container: string,
  header: string,
  body: string,
  bodyEmpty: string,
  footer: string,
  title: string,
  description: string,
  logo: string,
  logoImage: string,
  headerText: string,
  navigationButton: string,
  completedPage: string,
  navigation: {
    complete: string,
    prev: string,
    next: string,
    start: string,
    preview: string,
    edit: string,
  },
  progress: string,
  progressBar: string,
  progressTextInBar: string,
  progressButtonsContainerCenter: string,
  progressButtonsContainer: string,
  progressButtonsImageButtonLeft: string,
  progressButtonsImageButtonRight: string,
  progressButtonsImageButtonHidden: string,
  progressButtonsListContainer: string,
  progressButtonsList: string,
  progressButtonsListElementPassed: string,
  progressButtonsListElementCurrent: string,
  progressButtonsListElementNonClickable: string,
  progressButtonsPageTitle: string,
  progressButtonsPageDescription: string,
  page: {
    root: string,
    title: string,
    description: string,
  },
  pageTitle: string,
  pageDescription: string,
  row: string,
  question: {
    mainRoot: string,
    flowRoot: string,
    header: string,
    headerLeft: string,
    content: string,
    contentLeft: string,
    titleLeftRoot: string,
    requiredText: string,
    title: string,
    titleExpandable: string,
    titleExpanded: string,
    titleCollapsed: string,
    number: string,
    description: string,
    comment: string,
    required: string,
    titleRequired: string,
    hasError: string,
    indent: number,
    footer: string,
    formGroup: string,
    asCell: string,
    icon: string,
    iconExpanded: string,
    disabled: string,
  },
  panel: {
    title: string,
    titleExpandable: string,
    titleExpanded: string,
    titleCollapsed: string,
    titleOnError: string,
    icon: string,
    iconExpanded: string,
    description: string,
    container: string,
    footer: string,
    number: string,
    requiredText: string,
  },
  error: {
    root: string,
    icon: string,
    item: string,
    locationTop: string,
    locationBottom: string,
  },
  boolean: {
    root: string,
    rootRadio: string,
    item: string,
    control: string,
    itemChecked: string,
    itemIndeterminate: string,
    itemDisabled: string,
    switch: string,
    slider: string,
    label: string,
    disabledLabel: string,
    rootCheckbox: string,
    checkboxItem: string,
    checkboxItemChecked: string,
    controlCheckbox: string,
    checkboxControlLabel: string,
    checkboxItemIndeterminate: string,
    checkboxItemDisabled: string,
    checkboxMaterialDecorator: string,
    checkboxItemDecorator: string,
  },
  checkbox: {
    root: string,
    item: string,
    itemSelectAll: string,
    itemNone: string,
    itemChecked: string,
    itemInline: string,
    label: string,
    labelChecked: string,
    itemControl: string,
    itemDecorator: string,
    controlLabel: string,
    other: string,
    column: string,
  },
  ranking: {
    root: string,
    rootMobileMod: string,
    rootDragMod: string,
    rootDisabled: string,
    item: string,
    itemContent: string,
    itemIndex: string,
    controlLabel: string,
    itemGhostNode: string,
    itemIconContainer: string,
    itemIcon: string,
    itemIconHoverMod: string,
    itemIconFocusMod: string,
    itemGhostMod: string,
    itemDragMod: string,
  },
  comment: string,
  dropdown: {
    root: string,
    control: string,
    selectWrapper: string,
    other: string,
    cleanButton: string,
    cleanButtonSvg: string,
    cleanButtonIconId: string,
    controlValue: string,
    filterStringInput: string,
  },
  html: {
    root: string,
  },
  image: {
    root: string,
    image: string,
  },
  matrix: {
    root: string,
    label: string,
    itemChecked: string,
    itemDecorator: string,
    cell: string,
    cellText: string,
    cellTextSelected: string,
    cellLabel: string,
    cellResponsiveTitle: string,
  },
  matrixdropdown: {
    root: string,
    cell: string,
    headerCell: string,
    row: string,
    rowAdditional: string,
    detailRow: string,
    detailRowText: string,
    detailCell: string,
    choiceCell: string,
    detailButton: string,
    detailButtonExpanded: string,
    detailIcon: string,
    detailIconExpanded: string,
    detailPanelCell: string,
    actionsCell: string,
  },
  matrixdynamic: {
    root: string,
    button: string,
    buttonAdd: string,
    buttonRemove: string,
    iconAdd: string,
    iconRemove: string,
    iconDrag: string,
    cell: string,
    headerCell: string,
    row: string,
    detailRow: string,
    detailCell: string,
    choiceCell: string,
    detailButton: string,
    detailButtonExpanded: string,
    detailIcon: string,
    detailIconExpanded: string,
    detailPanelCell: string,
    actionsCell: string,
    emptyRowsSection: string,
    emptyRowsText: string,
    emptyRowsButton: string,
    ghostRow: string,
  },
  paneldynamic: {
    root: string,
    title: string,
    button: string,
    buttonAdd: string,
    buttonRemove: string,
    buttonRemoveRight: string,
    buttonPrev: string,
    buttonPrevDisabled: string,
    buttonNextDisabled: string,
    buttonNext: string,
    progressContainer: string,
    progress: string,
    progressBar: string,
    progressText: string,
    panelWrapper: string,
    panelWrapperInRow: string,
    footer: string,
    progressBtnIcon: string,
  },
  multipletext: {
    root: string,
    itemTitle: string,
    item: string,
    row: string,
    itemLabel: string,
    itemValue: string,
  },
  radiogroup: {
    root: string,
    item: string,
    itemChecked: string,
    itemInline: string,
    itemDecorator: string,
    label: string,
    labelChecked: string,
    itemControl: string,
    controlLabel: string,
    other: string,
    clearButton: string,
    column: string,
  },
  buttongroup: {
    root: string,
    item: string,
    itemIcon: string,
    itemDecorator: string,
    itemCaption: string,
    itemHover: string,
    itemSelected: string,
    itemDisabled: string,
    itemControl: string,
  },
  imagepicker: {
    root: string,
    item: string,
    itemChecked: string,
    label: string,
    itemControl: string,
    image: string,
    itemInline: string,
    itemText: string,
    clearButton: string,
    column: string,
  },
  rating: {
    root: string,
    item: string,
    selected: string,
    minText: string,
    itemText: string,
    maxText: string,
  },
  text: string,
  expression: string,
  file: {
    root: string,
    placeholderInput: string,
    preview: string,
    removeButton: string,
    fileInput: string,
    removeFile: string,
    fileDecorator: string,
    fileSign: string,
    chooseFile: string,
    noFileChosen: string,
    dragAreaPlaceholder: string,
    fileList: string,
  },
  signaturepad: {
    root: string,
    controls: string,
    placeholder: string,
    clearButton: string,
  },
  saveData: {
    root: string,
    saving: string,
    error: string,
    success: string,
    saveAgainButton: string,
  },
  window: {
    root: string,
    body: string,
    header: {
      root: string,
      title: string,
      button: string,
      buttonExpanded: string,
      buttonCollapsed: string,
    },
  },
  variables: {
    themeMark: string,
  },
  tagbox: {
    root: string,
    small: string,
    selectWrapper: string,
    other: string,
    cleanButton: string,
    cleanButtonSvg: string,
    cleanButtonIconId: string,
    cleanItemButton: string,
    cleanItemButtonSvg: string,
    cleanItemButtonIconId: string,
    control: string,
    controlValue: string,
    controlEmpty: string,
    placeholderInput: string,
    filterStringInput: string,
  },
};
export declare var surveyTimerFunctions: {
  setTimeout: (func: any) => any,
  clearTimeout: (timerId: number) => void,
};
export declare var matrixDropdownColumnTypes: {
  dropdown: {
    onCellQuestionUpdate: (cellQuestion: any, column: any, question: any, data: any) => void,
  },
  checkbox: {
    onCellQuestionUpdate: (cellQuestion: any, column: any, question: any, data: any) => void,
  },
  radiogroup: {
    onCellQuestionUpdate: (cellQuestion: any, column: any, question: any, data: any) => void,
  },
  text: any,
  comment: any,
  boolean: {
    onCellQuestionUpdate: (cellQuestion: any, column: any, question: any, data: any) => void,
  },
  expression: any,
  rating: any,
};
export declare var _isMobile: boolean;
export declare var vendor: any;
export declare var _IPad: boolean;
export declare var IsMobile: boolean;
export declare var _isTouch: boolean;
export declare var IsTouch: boolean;
export declare var minMaxTypes: any;
export declare var youtubeTags: any;
export declare var videoSuffics: any;
export declare var youtubeUrl: any;
export declare var youtubeEmbed: any;
export declare var defaultWidth: number;
export declare var defaultHeight: number;
export declare var Version: string;
export declare var defaultBootstrapCss: {
  root: string,
  container: string,
  header: string,
  body: string,
  bodyEmpty: string,
  footer: string,
  title: string,
  description: string,
  logo: string,
  logoImage: string,
  headerText: string,
  navigationButton: string,
  completedPage: string,
  navigation: {
    complete: string,
    prev: string,
    next: string,
    start: string,
    preview: string,
    edit: string,
  },
  progress: string,
  progressBar: string,
  progressTextUnderBar: string,
  progressTextInBar: string,
  progressButtonsContainerCenter: string,
  progressButtonsContainer: string,
  progressButtonsImageButtonLeft: string,
  progressButtonsImageButtonRight: string,
  progressButtonsImageButtonHidden: string,
  progressButtonsListContainer: string,
  progressButtonsList: string,
  progressButtonsListElementPassed: string,
  progressButtonsListElementCurrent: string,
  progressButtonsListElementNonClickable: string,
  progressButtonsPageTitle: string,
  progressButtonsPageDescription: string,
  page: {
    root: string,
    title: string,
    description: string,
  },
  pageTitle: string,
  pageDescription: string,
  row: string,
  question: {
    mainRoot: string,
    flowRoot: string,
    header: string,
    headerLeft: string,
    content: string,
    contentLeft: string,
    titleLeftRoot: string,
    title: string,
    titleExpandable: string,
    titleExpanded: string,
    titleCollapsed: string,
    number: string,
    description: string,
    descriptionUnderInput: string,
    requiredText: string,
    comment: string,
    required: string,
    titleRequired: string,
    hasError: string,
    indent: number,
    formGroup: string,
  },
  panel: {
    title: string,
    titleExpandable: string,
    titleExpanded: string,
    titleCollapsed: string,
    titleOnError: string,
    icon: string,
    iconExpanded: string,
    description: string,
    container: string,
    footer: string,
    number: string,
    requiredText: string,
  },
  error: {
    root: string,
    icon: string,
    item: string,
    locationTop: string,
    locationBottom: string,
  },
  boolean: {
    root: string,
    rootRadio: string,
    item: string,
    control: string,
    controlCheckbox: string,
    itemChecked: string,
    itemIndeterminate: string,
    itemDisabled: string,
    switch: string,
    slider: string,
    label: string,
    disabledLabel: string,
    materialDecorator: string,
    itemDecorator: string,
    checkedPath: string,
    uncheckedPath: string,
    indeterminatePath: string,
  },
  checkbox: {
    root: string,
    item: string,
    itemChecked: string,
    itemSelectAll: string,
    itemNone: string,
    itemInline: string,
    itemControl: string,
    itemDecorator: string,
    label: string,
    labelChecked: string,
    controlLabel: string,
    materialDecorator: string,
    other: string,
    column: string,
  },
  ranking: {
    root: string,
    rootMobileMod: string,
    rootDragMod: string,
    rootDisabled: string,
    item: string,
    itemContent: string,
    itemIndex: string,
    controlLabel: string,
    itemGhostNode: string,
    itemIconContainer: string,
    itemIcon: string,
    itemIconHoverMod: string,
    itemIconFocusMod: string,
    itemGhostMod: string,
    itemDragMod: string,
  },
  comment: string,
  dropdown: {
    root: string,
    selectWrapper: string,
    control: string,
    other: string,
    cleanButton: string,
    cleanButtonSvg: string,
    cleanButtonIconId: string,
  },
  tagbox: {
    root: string,
    selectWrapper: string,
    control: string,
    other: string,
    cleanButton: string,
    cleanButtonSvg: string,
    cleanButtonIconId: string,
  },
  html: {
    root: string,
  },
  image: {
    root: string,
    image: string,
  },
  matrix: {
    root: string,
    label: string,
    itemChecked: string,
    itemDecorator: string,
    cellText: string,
    cellTextSelected: string,
    cellLabel: string,
    cellResponsiveTitle: string,
  },
  matrixdropdown: {
    root: string,
    cell: string,
    headerCell: string,
    row: string,
    rowAdditional: string,
    detailRow: string,
    detailRowText: string,
    detailCell: string,
    detailButton: string,
    detailButtonExpanded: string,
    detailIcon: string,
    detailIconExpanded: string,
    detailPanelCell: string,
    actionsCell: string,
  },
  matrixdynamic: {
    root: string,
    button: string,
    buttonAdd: string,
    buttonRemove: string,
    iconAdd: string,
    iconRemove: string,
    iconDrag: string,
    headerCell: string,
    row: string,
    detailRow: string,
    detailCell: string,
    detailButton: string,
    detailButtonExpanded: string,
    detailIcon: string,
    detailIconExpanded: string,
    detailPanelCell: string,
    actionsCell: string,
    emptyRowsSection: string,
    emptyRowsText: string,
    emptyRowsButton: string,
    ghostRow: string,
  },
  paneldynamic: {
    root: string,
    navigation: string,
    progressTop: string,
    progressBottom: string,
    title: string,
    button: string,
    buttonAdd: string,
    buttonRemove: string,
    buttonRemoveRight: string,
    buttonPrev: string,
    buttonNext: string,
    buttonPrevDisabled: string,
    buttonNextDisabled: string,
    progressContainer: string,
    progress: string,
    progressBar: string,
    progressText: string,
    panelWrapper: string,
    panelWrapperInRow: string,
    footer: string,
    progressBtnIcon: string,
  },
  multipletext: {
    root: string,
    itemTitle: string,
    item: string,
    itemLabel: string,
    row: string,
    itemValue: string,
  },
  radiogroup: {
    root: string,
    item: string,
    itemChecked: string,
    itemInline: string,
    label: string,
    labelChecked: string,
    itemControl: string,
    itemDecorator: string,
    controlLabel: string,
    materialDecorator: string,
    other: string,
    clearButton: string,
    column: string,
  },
  buttongroup: {
    root: string,
    item: string,
    itemIcon: string,
    itemDecorator: string,
    itemCaption: string,
    itemHover: string,
    itemSelected: string,
    itemDisabled: string,
    itemControl: string,
  },
  imagepicker: {
    root: string,
    item: string,
    itemChecked: string,
    itemInline: string,
    label: string,
    itemControl: string,
    image: string,
    itemText: string,
    clearButton: string,
  },
  rating: {
    root: string,
    item: string,
    selected: string,
    minText: string,
    itemText: string,
    maxText: string,
    disabled: string,
  },
  text: string,
  expression: string,
  file: {
    root: string,
    placeholderInput: string,
    preview: string,
    removeButton: string,
    fileInput: string,
    removeFile: string,
    fileDecorator: string,
    fileSign: string,
    removeButtonBottom: string,
    dragAreaPlaceholder: string,
    fileList: string,
  },
  signaturepad: {
    root: string,
    controls: string,
    placeholder: string,
    clearButton: string,
  },
  saveData: {
    root: string,
    saving: string,
    error: string,
    success: string,
    saveAgainButton: string,
  },
  window: {
    root: string,
    body: string,
    header: {
      root: string,
      title: string,
      button: string,
      buttonExpanded: string,
      buttonCollapsed: string,
    },
  },
};
export declare var defaultBootstrapMaterialCss: {
  root: string,
  container: string,
  header: string,
  body: string,
  bodyEmpty: string,
  footer: string,
  title: string,
  description: string,
  logo: string,
  logoImage: string,
  headerText: string,
  navigationButton: string,
  completedPage: string,
  navigation: {
    complete: string,
    prev: string,
    next: string,
    start: string,
    preview: string,
    edit: string,
  },
  progress: string,
  progressBar: string,
  progressTextUnderBar: string,
  progressTextInBar: string,
  progressButtonsContainerCenter: string,
  progressButtonsContainer: string,
  progressButtonsImageButtonLeft: string,
  progressButtonsImageButtonRight: string,
  progressButtonsImageButtonHidden: string,
  progressButtonsListContainer: string,
  progressButtonsList: string,
  progressButtonsListElementPassed: string,
  progressButtonsListElementCurrent: string,
  progressButtonsListElementNonClickable: string,
  progressButtonsPageTitle: string,
  progressButtonsPageDescription: string,
  page: {
    root: string,
    title: string,
    description: string,
  },
  pageTitle: string,
  pageDescription: string,
  row: string,
  question: {
    mainRoot: string,
    flowRoot: string,
    header: string,
    headerLeft: string,
    content: string,
    contentLeft: string,
    titleLeftRoot: string,
    requiredText: string,
    title: string,
    titleExpandable: string,
    titleExpanded: string,
    titleCollapsed: string,
    number: string,
    description: string,
    descriptionUnderInput: string,
    comment: string,
    required: string,
    titleRequired: string,
    hasError: string,
    indent: number,
    formGroup: string,
  },
  panel: {
    title: string,
    titleExpandable: string,
    titleExpanded: string,
    titleCollapsed: string,
    titleOnError: string,
    icon: string,
    iconExpanded: string,
    description: string,
    container: string,
    footer: string,
    number: string,
    requiredText: string,
  },
  error: {
    root: string,
    icon: string,
    item: string,
    locationTop: string,
    locationBottom: string,
  },
  boolean: {
    root: string,
    rootRadio: string,
    item: string,
    control: string,
    controlCheckbox: string,
    itemChecked: string,
    itemIndeterminate: string,
    itemDisabled: string,
    switch: string,
    slider: string,
    label: string,
    disabledLabel: string,
    materialDecorator: string,
    itemDecorator: string,
    checkedPath: string,
    uncheckedPath: string,
    indeterminatePath: string,
  },
  checkbox: {
    root: string,
    item: string,
    itemChecked: string,
    itemSelectAll: string,
    itemNone: string,
    itemInline: string,
    itemDecorator: string,
    itemControl: string,
    label: string,
    labelChecked: string,
    controlLabel: string,
    materialDecorator: string,
    other: string,
    column: string,
  },
  ranking: {
    root: string,
    rootMobileMod: string,
    rootDragMod: string,
    rootDisabled: string,
    item: string,
    itemContent: string,
    itemIndex: string,
    controlLabel: string,
    itemGhostNode: string,
    itemIconContainer: string,
    itemIcon: string,
    itemIconHoverMod: string,
    itemIconFocusMod: string,
    itemGhostMod: string,
    itemDragMod: string,
  },
  comment: string,
  dropdown: {
    root: string,
    selectWrapper: string,
    control: string,
    other: string,
    cleanButton: string,
    cleanButtonSvg: string,
    cleanButtonIconId: string,
  },
  tagbox: {
    root: string,
    selectWrapper: string,
    control: string,
    other: string,
    cleanButton: string,
    cleanButtonSvg: string,
    cleanButtonIconId: string,
  },
  html: {
    root: string,
  },
  image: {
    root: string,
    image: string,
  },
  matrix: {
    root: string,
    row: string,
    label: string,
    cellText: string,
    cellTextSelected: string,
    cellLabel: string,
    itemValue: string,
    itemChecked: string,
    itemDecorator: string,
    materialDecorator: string,
    cellResponsiveTitle: string,
  },
  matrixdropdown: {
    root: string,
    itemValue: string,
    headerCell: string,
    row: string,
    rowAdditional: string,
    detailRow: string,
    detailRowText: string,
    detailCell: string,
    detailButton: string,
    detailButtonExpanded: string,
    detailIcon: string,
    detailIconExpanded: string,
    detailPanelCell: string,
    actionsCell: string,
  },
  matrixdynamic: {
    mainRoot: string,
    flowRoot: string,
    root: string,
    button: string,
    itemValue: string,
    buttonAdd: string,
    buttonRemove: string,
    iconAdd: string,
    iconRemove: string,
    iconDrag: string,
    headerCell: string,
    row: string,
    detailRow: string,
    detailCell: string,
    detailButton: string,
    detailButtonExpanded: string,
    detailIcon: string,
    detailIconExpanded: string,
    detailPanelCell: string,
    actionsCell: string,
    emptyRowsSection: string,
    emptyRowsText: string,
    emptyRowsButton: string,
    ghostRow: string,
  },
  paneldynamic: {
    root: string,
    navigation: string,
    progressTop: string,
    progressBottom: string,
    title: string,
    button: string,
    buttonAdd: string,
    buttonRemove: string,
    buttonRemoveRight: string,
    buttonPrev: string,
    buttonNext: string,
    buttonPrevDisabled: string,
    buttonNextDisabled: string,
    progressContainer: string,
    progress: string,
    progressBar: string,
    progressText: string,
    panelWrapper: string,
    panelWrapperInRow: string,
    progressBtnIcon: string,
    footer: string,
  },
  multipletext: {
    root: string,
    itemTitle: string,
    item: string,
    itemLabel: string,
    row: string,
    itemValue: string,
  },
  radiogroup: {
    root: string,
    item: string,
    itemChecked: string,
    itemInline: string,
    itemDecorator: string,
    label: string,
    labelChecked: string,
    itemControl: string,
    controlLabel: string,
    materialDecorator: string,
    other: string,
    clearButton: string,
    column: string,
  },
  buttongroup: {
    root: string,
    item: string,
    itemIcon: string,
    itemDecorator: string,
    itemCaption: string,
    itemSelected: string,
    itemHover: string,
    itemDisabled: string,
    itemControl: string,
  },
  imagepicker: {
    root: string,
    item: string,
    itemChecked: string,
    itemInline: string,
    label: string,
    itemControl: string,
    image: string,
    itemText: string,
    clearButton: string,
  },
  rating: {
    root: string,
    item: string,
    selected: string,
    minText: string,
    itemText: string,
    maxText: string,
    disabled: string,
  },
  text: string,
  expression: string,
  file: {
    root: string,
    placeholderInput: string,
    preview: string,
    removeButton: string,
    fileInput: string,
    fileSign: string,
    removeFile: string,
    fileDecorator: string,
    removeButtonBottom: string,
    dragAreaPlaceholder: string,
    fileList: string,
  },
  signaturepad: {
    root: string,
    controls: string,
    placeholder: string,
    clearButton: string,
  },
  saveData: {
    root: string,
    saving: string,
    error: string,
    success: string,
    saveAgainButton: string,
  },
  window: {
    root: string,
    body: string,
    header: {
      root: string,
      title: string,
      button: string,
      buttonExpanded: string,
      buttonCollapsed: string,
    },
  },
};
export declare var defaultV2Css: {
  root: string,
  rootMobile: string,
  container: string,
  header: string,
  body: string,
  bodyEmpty: string,
  footer: string,
  title: string,
  description: string,
  logo: string,
  logoImage: string,
  headerText: string,
  headerClose: string,
  navigationButton: string,
  bodyNavigationButton: string,
  completedPage: string,
  timerRoot: string,
  navigation: {
    complete: string,
    prev: string,
    next: string,
    start: string,
    preview: string,
    edit: string,
  },
  panel: {
    title: string,
    titleExpandable: string,
    titleExpanded: string,
    titleCollapsed: string,
    titleOnExpand: string,
    titleOnError: string,
    titleBar: string,
    description: string,
    container: string,
    withFrame: string,
    content: string,
    icon: string,
    iconExpanded: string,
    footer: string,
    requiredText: string,
    header: string,
    collapsed: string,
    expanded: string,
    nested: string,
    invisible: string,
    navigationButton: string,
  },
  paneldynamic: {
    mainRoot: string,
    empty: string,
    root: string,
    navigation: string,
    title: string,
    button: string,
    buttonRemove: string,
    buttonAdd: string,
    buttonPrev: string,
    buttonPrevDisabled: string,
    buttonNextDisabled: string,
    buttonNext: string,
    progressContainer: string,
    progress: string,
    progressBar: string,
    progressText: string,
    separator: string,
    panelWrapper: string,
    footer: string,
    footerButtonsContainer: string,
    panelWrapperInRow: string,
    progressBtnIcon: string,
    noEntriesPlaceholder: string,
  },
  progress: string,
  progressBar: string,
  progressText: string,
  progressButtonsContainerCenter: string,
  progressButtonsContainer: string,
  progressButtonsImageButtonLeft: string,
  progressButtonsImageButtonRight: string,
  progressButtonsImageButtonHidden: string,
  progressButtonsListContainer: string,
  progressButtonsList: string,
  progressButtonsListElementPassed: string,
  progressButtonsListElementCurrent: string,
  progressButtonsListElementNonClickable: string,
  progressButtonsPageTitle: string,
  progressButtonsPageDescription: string,
  progressTextInBar: string,
  page: {
    root: string,
    emptyHeaderRoot: string,
    title: string,
    description: string,
  },
  pageTitle: string,
  pageDescription: string,
  row: string,
  rowMultiple: string,
  pageRow: string,
  question: {
    mainRoot: string,
    flowRoot: string,
    withFrame: string,
    asCell: string,
    answered: string,
    header: string,
    headerLeft: string,
    headerTop: string,
    headerBottom: string,
    content: string,
    contentLeft: string,
    titleLeftRoot: string,
    titleOnAnswer: string,
    titleOnError: string,
    title: string,
    titleExpandable: string,
    titleExpanded: string,
    titleCollapsed: string,
    titleBar: string,
    requiredText: string,
    number: string,
    description: string,
    descriptionUnderInput: string,
    comment: string,
    other: string,
    required: string,
    titleRequired: string,
    indent: number,
    footer: string,
    formGroup: string,
    hasError: string,
    collapsed: string,
    expanded: string,
    nested: string,
    invisible: string,
    composite: string,
  },
  image: {
    mainRoot: string,
    root: string,
    image: string,
    adaptive: string,
    withFrame: string,
  },
  html: {
    mainRoot: string,
    root: string,
    withFrame: string,
  },
  error: {
    root: string,
    icon: string,
    item: string,
    tooltip: string,
    outsideQuestion: string,
    aboveQuestion: string,
    belowQuestion: string,
    locationTop: string,
    locationBottom: string,
  },
  checkbox: {
    root: string,
    rootRow: string,
    rootMultiColumn: string,
    item: string,
    itemOnError: string,
    itemSelectAll: string,
    itemNone: string,
    itemDisabled: string,
    itemChecked: string,
    itemHover: string,
    itemInline: string,
    label: string,
    labelChecked: string,
    itemControl: string,
    itemDecorator: string,
    itemSvgIconId: string,
    controlLabel: string,
    materialDecorator: string,
    other: string,
    column: string,
  },
  radiogroup: {
    root: string,
    rootRow: string,
    rootMultiColumn: string,
    item: string,
    itemOnError: string,
    itemInline: string,
    label: string,
    labelChecked: string,
    itemDisabled: string,
    itemChecked: string,
    itemHover: string,
    itemControl: string,
    itemDecorator: string,
    controlLabel: string,
    materialDecorator: string,
    other: string,
    clearButton: string,
    column: string,
  },
  boolean: {
    mainRoot: string,
    root: string,
    rootRadio: string,
    item: string,
    itemOnError: string,
    control: string,
    itemChecked: string,
    itemIndeterminate: string,
    itemDisabled: string,
    label: string,
    switch: string,
    disabledLabel: string,
    sliderText: string,
    slider: string,
    radioItem: string,
    radioItemChecked: string,
    radioLabel: string,
    radioControlLabel: string,
    radioFieldset: string,
    itemRadioDecorator: string,
    materialRadioDecorator: string,
    itemRadioControl: string,
    rootCheckbox: string,
    checkboxItem: string,
    checkboxLabel: string,
    checkboxItemOnError: string,
    checkboxItemIndeterminate: string,
    checkboxItemChecked: string,
    checkboxItemDecorator: string,
    checkboxItemDisabled: string,
    controlCheckbox: string,
    checkboxMaterialDecorator: string,
    checkboxControlLabel: string,
    svgIconCheckedId: string,
  },
  text: {
    root: string,
    small: string,
    controlDisabled: string,
    onError: string,
  },
  multipletext: {
    root: string,
    itemLabel: string,
    itemLabelOnError: string,
    item: string,
    itemTitle: string,
    row: string,
    cell: string,
  },
  dropdown: {
    root: string,
    small: string,
    selectWrapper: string,
    other: string,
    onError: string,
    label: string,
    item: string,
    itemDisabled: string,
    itemChecked: string,
    itemHover: string,
    itemControl: string,
    itemDecorator: string,
    cleanButton: string,
    cleanButtonSvg: string,
    cleanButtonIconId: string,
    control: string,
    controlValue: string,
    controlDisabled: string,
    controlEmpty: string,
    controlLabel: string,
    filterStringInput: string,
    materialDecorator: string,
  },
  imagepicker: {
    mainRoot: string,
    root: string,
    rootColumn: string,
    item: string,
    itemOnError: string,
    itemInline: string,
    itemChecked: string,
    itemDisabled: string,
    itemHover: string,
    label: string,
    itemDecorator: string,
    imageContainer: string,
    itemControl: string,
    image: string,
    itemText: string,
    other: string,
    itemNoImage: string,
    itemNoImageSvgIcon: string,
    itemNoImageSvgIconId: string,
    column: string,
  },
  matrix: {
    mainRoot: string,
    tableWrapper: string,
    root: string,
    rootVerticalAlignTop: string,
    rootVerticalAlignMiddle: string,
    rootAlternateRows: string,
    rowError: string,
    cell: string,
    row: string,
    headerCell: string,
    rowTextCell: string,
    label: string,
    itemOnError: string,
    itemValue: string,
    itemChecked: string,
    itemDisabled: string,
    itemHover: string,
    materialDecorator: string,
    itemDecorator: string,
    cellText: string,
    cellTextSelected: string,
    cellTextDisabled: string,
    cellResponsiveTitle: string,
  },
  matrixdropdown: {
    mainRoot: string,
    rootScroll: string,
    root: string,
    rootVerticalAlignTop: string,
    rootVerticalAlignMiddle: string,
    rootAlternateRows: string,
    cell: string,
    row: string,
    headerCell: string,
    rowTextCell: string,
    cellRequiredText: string,
    detailButton: string,
    detailButtonExpanded: string,
    detailIcon: string,
    detailIconExpanded: string,
    detailIconId: string,
    detailIconExpandedId: string,
    actionsCell: string,
    emptyCell: string,
    verticalCell: string,
    cellQuestionWrapper: string,
  },
  matrixdynamic: {
    mainRoot: string,
    rootScroll: string,
    empty: string,
    root: string,
    cell: string,
    row: string,
    headerCell: string,
    rowTextCell: string,
    cellRequiredText: string,
    button: string,
    detailRow: string,
    detailButton: string,
    detailButtonExpanded: string,
    detailIcon: string,
    detailIconExpanded: string,
    detailIconId: string,
    detailIconExpandedId: string,
    detailPanelCell: string,
    actionsCell: string,
    buttonAdd: string,
    buttonRemove: string,
    iconAdd: string,
    iconRemove: string,
    dragElementDecorator: string,
    iconDragElement: string,
    footer: string,
    emptyRowsSection: string,
    iconDrag: string,
    ghostRow: string,
    emptyCell: string,
    verticalCell: string,
    cellQuestionWrapper: string,
  },
  rating: {
    rootDropdown: string,
    root: string,
    rootWrappable: string,
    item: string,
    itemOnError: string,
    itemHover: string,
    selected: string,
    minText: string,
    itemText: string,
    maxText: string,
    itemDisabled: string,
    control: string,
    controlValue: string,
    controlDisabled: string,
    controlEmpty: string,
    filterStringInput: string,
    onError: string,
  },
  comment: {
    root: string,
    small: string,
    controlDisabled: string,
    onError: string,
  },
  expression: string,
  file: {
    root: string,
    other: string,
    placeholderInput: string,
    preview: string,
    fileSign: string,
    fileList: string,
    fileSignBottom: string,
    fileDecorator: string,
    onError: string,
    fileDecoratorDrag: string,
    fileInput: string,
    noFileChosen: string,
    chooseFile: string,
    chooseFileAsText: string,
    chooseFileAsTextDisabled: string,
    chooseFileAsIcon: string,
    chooseFileIconId: string,
    disabled: string,
    removeButton: string,
    removeButtonBottom: string,
    removeButtonIconId: string,
    removeFile: string,
    removeFileSvg: string,
    removeFileSvgIconId: string,
    wrapper: string,
    defaultImage: string,
    defaultImageIconId: string,
    leftIconId: string,
    rightIconId: string,
    removeFileButton: string,
    dragAreaPlaceholder: string,
    imageWrapper: string,
    single: string,
    singleImage: string,
    mobile: string,
  },
  signaturepad: {
    mainRoot: string,
    root: string,
    small: string,
    controls: string,
    placeholder: string,
    clearButton: string,
    clearButtonIconId: string,
  },
  saveData: {
    root: string,
    saving: string,
    error: string,
    success: string,
    saveAgainButton: string,
  },
  window: {
    root: string,
    body: string,
    header: {
      root: string,
      title: string,
      button: string,
      buttonExpanded: string,
      buttonCollapsed: string,
    },
  },
  ranking: {
    root: string,
    rootMobileMod: string,
    rootDragMod: string,
    rootDisabled: string,
    rootDesignMode: string,
    item: string,
    itemContent: string,
    itemIndex: string,
    controlLabel: string,
    itemGhostNode: string,
    itemIconContainer: string,
    itemIcon: string,
    itemIconHoverMod: string,
    itemIconFocusMod: string,
    itemGhostMod: string,
    itemDragMod: string,
    itemOnError: string,
  },
  buttongroup: {
    root: string,
    item: string,
    itemIcon: string,
    itemDecorator: string,
    itemCaption: string,
    itemHover: string,
    itemSelected: string,
    itemDisabled: string,
    itemControl: string,
  },
  list: {
    root: string,
    item: string,
    itemBody: string,
    itemSelected: string,
  },
  actionBar: {
    root: string,
    item: string,
    defaultSizeMode: string,
    smallSizeMode: string,
    itemPressed: string,
    itemAsIcon: string,
    itemIcon: string,
    itemTitle: string,
  },
  variables: {
    mobileWidth: string,
    imagepickerGapBetweenItems: string,
    themeMark: string,
  },
  tagbox: {
    root: string,
    small: string,
    selectWrapper: string,
    other: string,
    onError: string,
    label: string,
    item: string,
    itemDisabled: string,
    itemChecked: string,
    itemHover: string,
    itemControl: string,
    itemDecorator: string,
    cleanButton: string,
    cleanButtonSvg: string,
    cleanButtonIconId: string,
    cleanItemButton: string,
    cleanItemButtonSvg: string,
    cleanItemButtonIconId: string,
    control: string,
    controlValue: string,
    controlValueItems: string,
    placeholderInput: string,
    controlDisabled: string,
    controlEmpty: string,
    controlLabel: string,
    filterStringInput: string,
    materialDecorator: string,
  },
};
export declare var modernCss: {
  root: string,
  timerRoot: string,
  container: string,
  header: string,
  headerClose: string,
  body: string,
  bodyEmpty: string,
  footer: string,
  title: string,
  description: string,
  logo: string,
  logoImage: string,
  headerText: string,
  navigationButton: string,
  completedPage: string,
  navigation: {
    complete: string,
    prev: string,
    next: string,
    start: string,
    preview: string,
    edit: string,
  },
  panel: {
    title: string,
    titleExpandable: string,
    titleExpanded: string,
    titleCollapsed: string,
    titleOnError: string,
    description: string,
    container: string,
    content: string,
    icon: string,
    iconExpanded: string,
    footer: string,
    requiredText: string,
    number: string,
  },
  paneldynamic: {
    root: string,
    navigation: string,
    title: string,
    button: string,
    buttonRemove: string,
    buttonRemoveRight: string,
    buttonAdd: string,
    progressTop: string,
    progressBottom: string,
    buttonPrev: string,
    buttonNext: string,
    buttonPrevDisabled: string,
    buttonNextDisabled: string,
    progressContainer: string,
    progress: string,
    progressBar: string,
    progressText: string,
    separator: string,
    panelWrapper: string,
    panelWrapperInRow: string,
    progressBtnIcon: string,
    footer: string,
  },
  progress: string,
  progressBar: string,
  progressText: string,
  progressTextInBar: string,
  progressButtonsContainerCenter: string,
  progressButtonsContainer: string,
  progressButtonsImageButtonLeft: string,
  progressButtonsImageButtonRight: string,
  progressButtonsImageButtonHidden: string,
  progressButtonsListContainer: string,
  progressButtonsList: string,
  progressButtonsListElementPassed: string,
  progressButtonsListElementCurrent: string,
  progressButtonsListElementNonClickable: string,
  progressButtonsPageTitle: string,
  progressButtonsPageDescription: string,
  page: {
    root: string,
    title: string,
    description: string,
  },
  pageTitle: string,
  pageDescription: string,
  row: string,
  question: {
    mainRoot: string,
    flowRoot: string,
    asCell: string,
    header: string,
    headerLeft: string,
    headerTop: string,
    headerBottom: string,
    content: string,
    contentLeft: string,
    titleLeftRoot: string,
    answered: string,
    titleOnAnswer: string,
    titleOnError: string,
    title: string,
    titleExpandable: string,
    titleExpanded: string,
    titleCollapsed: string,
    icon: string,
    iconExpanded: string,
    requiredText: string,
    number: string,
    description: string,
    descriptionUnderInput: string,
    comment: string,
    required: string,
    titleRequired: string,
    indent: number,
    footer: string,
    formGroup: string,
    hasError: string,
    disabled: string,
  },
  image: {
    root: string,
    image: string,
  },
  error: {
    root: string,
    icon: string,
    item: string,
    locationTop: string,
    locationBottom: string,
  },
  checkbox: {
    root: string,
    item: string,
    itemSelectAll: string,
    itemNone: string,
    itemDisabled: string,
    itemChecked: string,
    itemHover: string,
    itemInline: string,
    label: string,
    labelChecked: string,
    itemControl: string,
    itemDecorator: string,
    itemSvgIconId: string,
    controlLabel: string,
    materialDecorator: string,
    other: string,
    column: string,
  },
  ranking: {
    root: string,
    rootMobileMod: string,
    rootDragMod: string,
    rootDisabled: string,
    item: string,
    itemContent: string,
    itemIndex: string,
    controlLabel: string,
    itemGhostNode: string,
    itemIconContainer: string,
    itemIcon: string,
    itemIconHoverMod: string,
    itemIconFocusMod: string,
    itemGhostMod: string,
    itemDragMod: string,
  },
  radiogroup: {
    root: string,
    item: string,
    itemInline: string,
    label: string,
    labelChecked: string,
    itemDisabled: string,
    itemChecked: string,
    itemHover: string,
    itemControl: string,
    itemDecorator: string,
    itemSvgIconId: string,
    controlLabel: string,
    materialDecorator: string,
    other: string,
    clearButton: string,
    column: string,
  },
  buttongroup: {
    root: string,
    item: string,
    itemIcon: string,
    itemDecorator: string,
    itemCaption: string,
    itemSelected: string,
    itemHover: string,
    itemDisabled: string,
    itemControl: string,
  },
  boolean: {
    root: string,
    rootRadio: string,
    small: string,
    item: string,
    control: string,
    itemChecked: string,
    itemIndeterminate: string,
    itemDisabled: string,
    switch: string,
    slider: string,
    label: string,
    disabledLabel: string,
    rootCheckbox: string,
    checkboxItem: string,
    checkboxItemChecked: string,
    controlCheckbox: string,
    checkboxControlLabel: string,
    checkboxItemIndeterminate: string,
    checkboxItemDisabled: string,
    checkboxMaterialDecorator: string,
    checkboxItemDecorator: string,
    indeterminatePath: string,
    svgIconCheckedId: string,
    svgIconUncheckedId: string,
    svgIconIndId: string,
  },
  text: {
    root: string,
    small: string,
    onError: string,
  },
  multipletext: {
    root: string,
    item: string,
    itemLabel: string,
    itemTitle: string,
    row: string,
    cell: string,
  },
  dropdown: {
    root: string,
    small: string,
    control: string,
    selectWrapper: string,
    other: string,
    onError: string,
    cleanButton: string,
    cleanButtonSvg: string,
    cleanButtonIconId: string,
    filterStringInput: string,
    controlValue: string,
  },
  tagbox: {
    root: string,
    small: string,
    selectWrapper: string,
    other: string,
    cleanButton: string,
    cleanButtonSvg: string,
    cleanButtonIconId: string,
    cleanItemButton: string,
    cleanItemButtonSvg: string,
    cleanItemButtonIconId: string,
    control: string,
    controlValue: string,
    controlEmpty: string,
    placeholderInput: string,
    filterStringInput: string,
  },
  imagepicker: {
    root: string,
    column: string,
    item: string,
    itemInline: string,
    itemChecked: string,
    itemDisabled: string,
    itemHover: string,
    label: string,
    itemControl: string,
    image: string,
    itemText: string,
    clearButton: string,
    other: string,
  },
  matrix: {
    tableWrapper: string,
    root: string,
    rowError: string,
    cell: string,
    headerCell: string,
    label: string,
    itemValue: string,
    itemChecked: string,
    itemDisabled: string,
    itemHover: string,
    materialDecorator: string,
    itemDecorator: string,
    cellText: string,
    cellTextSelected: string,
    cellTextDisabled: string,
    cellResponsiveTitle: string,
    itemSvgIconId: string,
  },
  matrixdropdown: {
    root: string,
    cell: string,
    headerCell: string,
    row: string,
    rowAdditional: string,
    detailRow: string,
    detailRowText: string,
    detailCell: string,
    choiceCell: string,
    detailButton: string,
    detailButtonExpanded: string,
    detailIcon: string,
    detailIconExpanded: string,
    detailPanelCell: string,
    actionsCell: string,
  },
  matrixdynamic: {
    root: string,
    cell: string,
    headerCell: string,
    button: string,
    buttonAdd: string,
    buttonRemove: string,
    iconAdd: string,
    iconRemove: string,
    iconDrag: string,
    row: string,
    detailRow: string,
    detailCell: string,
    choiceCell: string,
    detailButton: string,
    detailButtonExpanded: string,
    detailIcon: string,
    detailIconExpanded: string,
    detailPanelCell: string,
    actionsCell: string,
    emptyRowsSection: string,
    emptyRowsText: string,
    emptyRowsButton: string,
    ghostRow: string,
  },
  rating: {
    root: string,
    item: string,
    selected: string,
    minText: string,
    itemText: string,
    maxText: string,
    itemDisabled: string,
    filterStringInput: string,
  },
  comment: {
    root: string,
    small: string,
  },
  expression: string,
  file: {
    root: string,
    other: string,
    placeholderInput: string,
    preview: string,
    fileSignBottom: string,
    fileDecorator: string,
    fileInput: string,
    noFileChosen: string,
    chooseFile: string,
    controlDisabled: string,
    removeButton: string,
    removeButtonBottom: string,
    removeFile: string,
    removeFileSvg: string,
    removeFileSvgIconId: string,
    wrapper: string,
    dragAreaPlaceholder: string,
    fileList: string,
  },
  signaturepad: {
    root: string,
    small: string,
    controls: string,
    placeholder: string,
    clearButton: string,
  },
  saveData: {
    root: string,
    saving: string,
    error: string,
    success: string,
    saveAgainButton: string,
  },
  window: {
    root: string,
    body: string,
    header: {
      root: string,
      title: string,
      button: string,
      buttonExpanded: string,
      buttonCollapsed: string,
    },
  },
  variables: {
    themeMark: string,
  },
};
export declare var SvgRegistry: SvgIconRegistry;
export declare var SvgBundleViewModel: any;
export declare var path: any;
export declare var koTemplate: any;
export declare var registerTemplateEngine: (ko: any, platform: string) => void;
export declare var template: any;
export declare var ActionBarItemViewModel: any;
export declare var ActionBarItemDropdownViewModel: any;
export declare var ActionBarSeparatorViewModel: any;
export declare var CheckboxViewModel: any;
export declare var BooleanRadioItemViewModel: any;
export declare var BooleanRadioViewModel: any;
export declare var templateBridge: any;
export declare var TitleElementViewModel: any;
export declare var TitleContentViewModel: any;
export declare var TitleActionViewModel: any;
export declare var StringViewerViewModel: any;
export declare var LogoImageViewModel: any;
export declare var Skeleton: any;
export declare var RatingDropdownViewModel: any;
export declare var DropdownViewModel: any;
export declare var DropdownSelectViewModel: any;
export declare var TagboxViewComponent: any;
export declare var TagboxViewModel: any;
export declare var ListItemViewComponent: any;
export declare var ListViewComponent: any;
export declare var SvgIconViewModel: any;
export declare var SurveyQuestionMatrixDynamicRemoveButton: any;
export declare var SurveyQuestionMatrixDetailButton: any;
export declare var SurveyQuestionMatrixDynamicDragDropIcon: any;
export declare var SurveyNavigationButton: any;
export declare var addBtnTemplate: any;
export declare var nextBtnTemplate: any;
export declare var prevBtnTemplate: any;
export declare var progressTextTemplate: any;
export declare var SurveyQuestionPaneldynamicActioons: any;
export declare var BrandInfoComponent: any;
export declare var innerKo: any;