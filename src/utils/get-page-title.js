const title='百度贴社区'

export default function getPageTitle(pageTitle) {
    if(pageTitle){
        return `${pageTitle} - ${title}`
    }
    return `虚拟社区`
}