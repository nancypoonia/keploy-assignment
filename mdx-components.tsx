import type { MDXComponents } from "mdx/types";
import type { ComponentPropsWithoutRef } from "react";
import { Pre } from "@/components/Pre";

function Heading({ as: Tag, id, children, ...rest }: { as: "h2" | "h3" } & ComponentPropsWithoutRef<"h2">) {
  // "Step 3: Record test cases" -> small "Step 03" tag above "Record test cases"
  const m = typeof children === "string" ? /^Step (\d+): (.+)$/.exec(children) : null;
  const content = m ? (
    <>
      <span className="step-tag">Step {m[1].padStart(2, "0")}</span>
      {m[2]}
    </>
  ) : (
    children
  );
  return (
    <Tag id={id} {...rest}>
      {id ? (
        <a href={`#${id}`} className="heading-anchor">
          {content}
        </a>
      ) : (
        content
      )}
    </Tag>
  );
}

const components: MDXComponents = {
  h2: (props) => <Heading as="h2" {...props} />,
  h3: (props) => <Heading as="h3" {...props} />,
  pre: (props) => <Pre {...props} />,
  table: (props) => (
    <div className="table-wrap">
      <table {...props} />
    </div>
  ),
  a: ({ href = "", ...props }) => {
    const external = /^https?:\/\//.test(href);
    return external ? (
      <a href={href} target="_blank" rel="noopener noreferrer" {...props} />
    ) : (
      <a href={href} {...props} />
    );
  },
};

export function useMDXComponents(): MDXComponents {
  return components;
}
