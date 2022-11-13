import { TransformFormat } from "@ponticus/escomplex-commons";

import FormatXML from "./FormatXML";
import FormatXMLCheckstyle from "./FormatXMLCheckstyle";

/**
 * Iterates through all `json` formats creating a FormatXML instance for each one. `checkstyle` format types need to
 * be transformed and are processed by `FormatXMLCheckstyle`.
 */
TransformFormat.forEachExt("json", (jsonFormat, jsonFormatName) => {
  // Create format name by substituting any leading `json` string for `xml`.
  let formatName = jsonFormatName.replace(/^json/, "xml");

  // If the format name isn't prepended with `xml` then add it.
  if (!formatName.startsWith("xml")) {
    formatName = `xml-${formatName}`;
  }

  switch (jsonFormat.type) {
    case "checkstyle":
      TransformFormat.addFormat(
        new FormatXMLCheckstyle(formatName, jsonFormat.type, jsonFormatName)
      );
      break;

    default:
      TransformFormat.addFormat(
        new FormatXML(formatName, jsonFormat.type, jsonFormatName)
      );
      break;
  }
});
