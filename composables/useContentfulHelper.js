import {documentToHtmlString} from "@contentful/rich-text-html-renderer";
import {BLOCKS, INLINES} from "@contentful/rich-text-types";

export default function () {
    const config = useRuntimeConfig()

    const getUri = (data) => {
        const { uri } = data.data
        if (uri.startsWith('/')) {
            return `${config.public.canonicalHostname}${uri}`
        } else {
            return uri
        }
    }
    const getTarget = (data) => {
        const { uri } = data.data
        if (uri.startsWith('/')) {
            return '_self'
        } else {
            return '_blank'
        }
    }

    return {
        renderCfContent(content) {
            return documentToHtmlString(content, {
                renderNode: {
                    [BLOCKS.EMBEDDED_ASSET]: ({ data: { target: { fields } } }) =>
                        `<img src="${fields.file.url}?fm=webp" alt="${fields.description}"/>`,
                    [INLINES.HYPERLINK]: (data) => {
                        return `<a href="${getUri(data)}" target="${getTarget(data)}">${data.content[0].value}</a>`
                    },
                    [BLOCKS.PARAGRAPH]: (node, next) => {
                        let content = next(node.content)
                        return `<p>${content}</p>`
                    }
                }
            })
        }
    }
}
