import $ from 'jquery';
import 'malihu-custom-scrollbar-plugin/jquery.mCustomScrollbar.concat.min';

export default class ScrollbarHelpers {
  private static scrollbarSettings = {
    axis: 'y',
    theme: 'dark-3',
    scrollButtons: { enable: false }
  };

  public static initScrollbar(selector: string, opts?: any) {
    $(selector).mCustomScrollbar({
      ...this.scrollbarSettings,
      ...opts
    });

    // fix dragger rail location for electron
    $('.mCSB_draggerContainer').append($('.mCSB_draggerRail'));
  }
}
