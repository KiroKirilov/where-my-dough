
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import * as $ from 'jquery';
import '../../../node_modules/malihu-custom-scrollbar-plugin/jquery.mCustomScrollbar.concat.min';

(window as any).jQuery = $;

export default class ScrollbarHelpers {
  private static scrollbarSettings = {
    axis: 'y',
    theme: 'dark-3',
    scrollButtons: { enable: true }
  };

  public static initScrollbar(selector: string) {
    const jQuery = (window as any).jQuery;
    jQuery(selector).mCustomScrollbar(this.scrollbarSettings);

    // fix dragger rail location for electron
    jQuery('.mCSB_draggerContainer').append(jQuery('.mCSB_draggerRail'));
  }
}
