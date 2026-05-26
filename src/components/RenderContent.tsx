import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";

const RenderContent = ({ content, path }) => {
  const extractImages = (content) => {
    const imageRegex = /!\[([^\]]*)\]\(([^)]+)\)/g;
    const images = [];
    let match;

    while ((match = imageRegex.exec(content)) !== null) {
      images.push({
        alt: match[1] || "Image",
        src: match[2],
      });
    }

    return images;
  };
  console.log("contet", content);

  const removeImages = (content) => {
    return content.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, "");
  };

  const images = extractImages(content);

  return (
    <div className="prose max-w-none">
      <ReactMarkdown
        children={content}
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw]}
        components={{
          a: ({ node, ...props }) => {
            return (
              <a
                {...props}
                className="text-dark inline-block p-1 break-words transition-colors"
                target="_blank"
                rel="noopener noreferrer"
                role="link"
              />
            );
          },
          img: ({ node, ...props }) => (
            <div className="row g-3 my-4 d-flex justify-content-center">
              <div className="w-75">
                <img
                  {...props}
                  className="img-fluid rounded my-4 mx-auto d-block"
                  style={{ objectFit: "contain" }}
                />
              </div>
            </div>
          ),
          strong: ({ node, ...props }) => (
            <strong className="font-bold">{props.children}</strong>
          ),
          h1: ({ node, ...props }) => (
            <h1 className="text-5xl font-bold mt-8 mb-4">{props.children}</h1>
          ),

         h2: ({ node, children, ...props }) => {
  const text = typeof children === "string"
    ? children
    : Array.isArray(children)
    ? children.map((c) => (typeof c === "string" ? c : "")).join("")
    : "";
  const id = text.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
  return (
    <h2 id={id} className="text-[1.6rem] text-dark font-[500] mt-7 mb-2">{children}</h2>
  );
},

          h3: ({ node, ...props }) => (
            <h3 className="text-3xl font-semibold mt-6 mb-3">
              {props.children}
            </h3>
          ),

          h4: ({ node, ...props }) => (
            <h4 className="text-2xl font-semibold mt-5 mb-3">
              {props.children}
            </h4>
          ),
          h5: ({ node, ...props }) => (
            <h5 className="text-xl font-semibold mt-5 mb-3">{props.children}</h5>
          ),
          h6: ({ node, ...props }) => (
            <h6 className="text-lg font-semibold mt-4 mb-3">{props.children}</h6>
          ),
          ul: ({ node, ...props }) => (
            <ul className="list-disc pl-6 mb-4">
              {props.children}
            </ul>
          ),
          ol: ({ node, ...props }) => (
            <ol className="list-decimal pl-6 mb-4">
              {props.children}
            </ol>
          ),
          li: ({ node, ...props }) => (
            <li className="mb-2 pl-4">{props.children}</li>
          ),
          table: ({ node, ...props }) => (
            <div className="table-responsive my-4">
              <table className="table table-bordered mb-0">
                {props.children}
              </table>
            </div>
          ),
          thead: ({ node, ...props }) => (
            <thead className="table-dark">{props.children}</thead>
          ),
          th: ({ node, ...props }) => (
            <th className="px-3 py-2 text-start">{props.children}</th>
          ),
          td: ({ node, ...props }) => (
            <td className="px-3 py-2">{props.children}</td>
          ),
          p: ({ node, ...props }) => <p className="mb-3">{props.children}</p>,
        }}
      />

      {images.length > 1 && (
        <a
          href="https://www.linkedin.com/feed/update/urn:li:activity:7372146062947643393/"
          target="_blank"
          className="image-grid-section my-5"
        >
          {/* First Row - 4 Images */}
          <div className="row g-3 mb-4">
            {images.slice(0, 4).map((image, index) => (
              <div key={`row1-${index}`} className="col-6 col-lg-3">
                <div className="imag">
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="img-fluid rounded"
                    style={{
                      objectFit: "contain",
                    }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Second Row - 3 Images (centered) */}
          {images.slice(4, 7).length > 0 && (
            <div className="row g-3 justify-content-center">
              {images.slice(4, 7).map((image, index) => (
                <div key={`row2-${index}`} className="col-6 col-lg-4">
                  <div className="ima">
                    <img
                      src={image.src}
                      alt={image.alt}
                      className="img-fluid rounded"
                      style={{
                        objectFit: "contain",
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </a>
      )}
    </div>
  );
};

export default RenderContent;
