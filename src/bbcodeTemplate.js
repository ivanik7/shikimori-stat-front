export default function bbcodeTemplate(url) {
    const frontUrl = import.meta.env.VITE_FRONT;
    
    return `[b]Статистика за год[/b]
[url=${frontUrl}][poster]${url}[/poster][/url]
Статистика сделана при помощи [url=${frontUrl}]shikimori-stat[/url]`
}
