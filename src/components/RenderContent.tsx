import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";

const RenderContent = ({ content, path }: { content: string; path?: string }) => {
  return (
    <div className="max-w-none">
      <ReactMarkdown
        children={content}
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw]}
        components={{
          h1: ({ node, ...props }) => (
            <h1 className="text-4xl font-bold text-dark mt-10 mb-4 leading-tight">
              {props.children}
            </h1>
          ),

          h2: ({ node, children, ...props }) => {
            const text =
              typeof children === "string"
                ? children
                : Array.isArray(children)
                ? children.map((c) => (typeof c === "string" ? c : "")).join("")
                : "";
            const id = text
              .toLowerCase()
              .replace(/\s+/g, "-")
              .replace(/[^a-z0-9-]/g, "");
            return (
              <h2 id={id} className="text-3xl font-[500] text-dark mt-10 mb-3 leading-snug">
                {children}
              </h2>
            );
          },

          h3: ({ node, ...props }) => (
            <h3 className="text-xl font-bold text-dark mt-8 mb-2 leading-snug">
              {props.children}
            </h3>
          ),

          h4: ({ node, ...props }) => (
            <h4 className="text-lg font-semibold text-dark mt-6 mb-2">
              {props.children}
            </h4>
          ),

          h5: ({ node, ...props }) => (
            <h5 className="text-base font-semibold text-dark mt-5 mb-2">
              {props.children}
            </h5>
          ),

          h6: ({ node, ...props }) => (
            <h6 className="text-[1rem] font-[500] text-primary mt-4 mb-2">
              {props.children}
            </h6>
          ),

          p: ({ node, ...props }) => (
            <p className="text-[#555555] font-normal text-[1rem] leading-relaxed mb-4">
              {props.children}
            </p>
          ),

          strong: ({ node, ...props }) => (
            <strong className="font-bold text-[#333333]">
              {props.children}
            </strong>
          ),

          em: ({ node, ...props }) => (
            <em className="italic text-[#555555]">{props.children}</em>
          ),

          ul: ({ node, ...props }) => (
            <ul className="list-disc pl-6 mb-4 space-y-1 text-[#555555]">
              {props.children}
            </ul>
          ),

          ol: ({ node, ...props }) => (
            <ol className="list-decimal pl-6 mb-4 space-y-1 text-[#555555]">
              {props.children}
            </ol>
          ),

          li: ({ node, ...props }) => (
            <li className="text-[1rem] leading-relaxed text-[#555555]">
              {props.children}
            </li>
          ),

          blockquote: ({ node, ...props }) => (
            <blockquote className="border-l-4 border-primary bg-[#EEF3F2] px-6 py-4 my-6 rounded-r-md italic text-[#555555]">
              {props.children}
            </blockquote>
          ),

          code: ({ node, inline, ...props }: any) =>
            inline ? (
              <code className="bg-[#f0f4f8] text-dark px-1.5 py-0.5 rounded font-mono text-sm">
                {props.children}
              </code>
            ) : (
              <pre className="bg-[#f0f4f8] border border-[#dde3ed] rounded-lg p-4 overflow-x-auto my-4">
                <code className="font-mono text-sm text-dark">
                  {props.children}
                </code>
              </pre>
            ),

          a: ({ node, children, href, ...props }) => (
            <a
              href={href}
              className="text-primary font-medium underline underline-offset-2 hover:text-[#004a38] transition-colors wrap-break-word"
              target="_blank"
              rel="noopener noreferrer"
              {...props}
            >
              {children}
            </a>
          ),

          img: ({ node, ...props }) => (
            <div className="my-6 flex justify-center">
              <img
                {...props}
                className="rounded-lg max-w-full object-contain shadow-sm"
              />
            </div>
          ),

          hr: () => <hr className="border-[#e0e0e0] my-8" />,

          table: ({ node, ...props }) => (
            <div className="overflow-x-auto my-6">
              <table className="w-full border-collapse border border-[#dde3ed] text-sm">
                {props.children}
              </table>
            </div>
          ),

          thead: ({ node, ...props }) => (
            <thead className="bg-dark text-white">{props.children}</thead>
          ),

          th: ({ node, ...props }) => (
            <th className="px-4 py-3 text-left font-semibold border border-[#dde3ed]">
              {props.children}
            </th>
          ),

          td: ({ node, ...props }) => (
            <td className="px-4 py-3 border border-[#dde3ed] text-[#555555]">
              {props.children}
            </td>
          ),

          tr: ({ node, ...props }) => (
            <tr className="even:bg-[#f8fafb]">{props.children}</tr>
          ),
        }}
      />
    </div>
  );
};

export default RenderContent;