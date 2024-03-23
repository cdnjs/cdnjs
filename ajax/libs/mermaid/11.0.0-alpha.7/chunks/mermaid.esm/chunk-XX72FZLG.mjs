import {
  AbstractMermaidTokenBuilder,
  CommonValueConverter,
  EmptyFileSystem,
  InfoGeneratedModule,
  MermaidGeneratedSharedModule,
  __name as __name2,
  createDefaultCoreModule,
  createDefaultSharedCoreModule,
  inject,
  lib_exports
} from "./chunk-7X73SP3Q.mjs";
import {
  __name
} from "./chunk-N5XDFYNB.mjs";

// ../parser/dist/chunks/mermaid-parser.core/chunk-Z464BCOM.mjs
var InfoTokenBuilder = class extends AbstractMermaidTokenBuilder {
  static {
    __name(this, "InfoTokenBuilder");
  }
  static {
    __name2(this, "InfoTokenBuilder");
  }
  constructor() {
    super(["info", "showInfo"]);
  }
};
var InfoModule = {
  parser: {
    TokenBuilder: () => new InfoTokenBuilder(),
    ValueConverter: () => new CommonValueConverter()
  }
};
function createInfoServices(context = EmptyFileSystem) {
  const shared = inject(
    createDefaultSharedCoreModule(context),
    MermaidGeneratedSharedModule
  );
  const Info = inject(
    createDefaultCoreModule({ shared }),
    InfoGeneratedModule,
    InfoModule
  );
  shared.ServiceRegistry.register(Info);
  return { shared, Info };
}
__name(createInfoServices, "createInfoServices");
__name2(createInfoServices, "createInfoServices");

export {
  InfoModule,
  createInfoServices
};
