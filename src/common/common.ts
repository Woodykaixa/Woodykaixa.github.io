/**
 * 检测屏幕宽度是否属于大屏幕（宽度超过768px）
 * @param width 屏幕宽度
 */
export function isLargeScreen(width: number) {
    return width > 768;
}

/**
 * 响应式布局组件需要的属性
 */
export interface ResponsiveComponentProps {
    screenWidth: number,
    isLargeScreen: boolean
}

/**
 * 服务器响应基本格式
 */
export interface ServerResponse {
    err: number,
    data: string | Array<any> | object
}
