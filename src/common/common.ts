/**
 * 检测屏幕宽度是否属于大屏幕（宽度超过768px）
 * @param width 屏幕宽度
 */
export function isLargeScreen(width: number) {
    console.log('width: ' + width)
    return width > 768;
}
