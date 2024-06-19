import SectionHeader, {
  SectionHeaderProps,
} from "@/components/small/SectionHeader";
import React from "react";

export default function withSectionHeader(OriginalComponent: React.FunctionComponent<Object>) {
  return function NewComponent(props: SectionHeaderProps) {
    return (
      <section>
        <SectionHeader {...props} />

        <OriginalComponent {...props} />
      </section>
    );
  };
}
