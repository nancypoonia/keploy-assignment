import type { MDXComponents } from "mdx/types";
import type { ComponentPropsWithoutRef } from "react";
import { Pre } from "@/components/Pre";

function Heading({ as: Tag, id, children, ...rest }: { as: "h2" | "h3" } & ComponentPropsWithoutRef<"h2">) {
  return (
    <Tag id={id} {...rest}>
      {id ? (
        <a href={`#${id}`} className="heading-anchor">
          {children}
        </a>
      ) : (
        children
      )}
    </Tag>
  );
}

const components: MDXComponents = {
  h1: (props) => (
    <h1
      className="text-[2.1rem] font-semibold leading-[1.12] tracking-[-0.025em] text-ink sm:text-[2.75rem]"
      {...props}
    />
  ),
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
