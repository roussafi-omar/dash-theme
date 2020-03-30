/*!
Name: Instagram Lite
Dependencies: jQuery
Author: Michael Lynch
Author URL: http://michaelynch.com
URL: https://github.com/michael-lynch/instagram-lite
Date Created: January 14, 2014
Licensed under the MIT license
http://instagram.pixelunion.net/
*/
! function(e) {
    e.fn.instagramLite = function(t) {
        if (!this.length) return this;
        plugin = this, plugin.defaults = {
            accessToken: null,
            limit: null,
            list: !0,
            videos: !1,
            urls: !1,
            captions: !1,
            date: !1,
            likes: !1,
            comments_count: !1,
			beforeSend: function(){},
            error: function() {},
            success: function() {},
            complete: function() {}
        };
        var d = e.extend({}, plugin.defaults, t),
            u = e(this);
        ! function() {
            if (d.accessToken) {
                var t = "https://api.instagram.com/v1/users/self/media/recent/?access_token=" + d.accessToken + "&count=" + d.limit;
                e.ajax({
                    type: "GET",
                    url: t,
                    dataType: "jsonp",
					beforeSend: function(){
                        d.beforeSend.call(this)
					},
                    success: function(t) {
                        200 === t.meta.code && t.data.length ? (function(t) {
                            for (var e = 0; e < t.length; e++) {
                                var i, s, a = t[e];
                                if ("image" === a.type || !d.videos) {
                                    if (i = '<img class="il-photo__img owl-lazy" data-src="' + a.images.standard_resolution.url + '" alt="Instagram Image" data-filter="' + a.filter + '" /><div class="overly"></div>', d.urls && (i = '<div class="mask"><div class="slider-thumb blackmask julia overflowed-thumb full-thumb il-photo"><a href="' + a.link + '" target="_blank">' + i + "</a></div>"), (d.captions || d.date || d.likes || d.comments_count) && (i += '<div class="il-photo__meta"><a href="' + a.link + '" target="_blank">'), d.captions && a.caption && (i += '<h3 class="il-photo__caption" data-caption-id="' + a.caption.id + '">' + c(a.caption.text) + "</a></h3>"), d.date) {
                                        var o = new Date(1e3 * a.created_time),
                                            n = o.getDate(),
                                            l = o.getMonth() + 1,
                                            r = o.getFullYear();
                                        o.getHours(), o.getMinutes(), o.getSeconds(), i += '<div class="il-photo__date">' + (o = l + "/" + n + "/" + r) + "</div>"
                                    }
                                    d.likes && (i += '<div class="il-photo__likes">' + a.likes.count + "</div>"), d.comments_count && a.comments && (i += '<div class="il-photo__comments">' + a.comments.count + "</div>"), (d.captions || d.date || d.likes || d.comments_count) && (i += "</div></div>")
                                }
                                if ("video" === a.type && d.videos && a.videos) a.videos.standard_resolution ? s = a.videos.standard_resolution.url : a.videos.low_resolution ? s = a.videos.low_resolution.url : a.videos.low_bandwidth && (s = a.videos.low_bandwidth.url), i = '<video poster="' + a.images.standard_resolution.url + '" controls>', i += '<source src="' + s + '" type="video/mp4;"></source>', i += "</video>";
                                d.list && i && (i = '<li class="il-item slider-item" data-instagram-id="' + a.id + '">' + i + "</li>"), "" !== i && u.append(i)
                            }
                        }(t.data), d.success.call(this)) : d.error.call(this)
                    },
                    complete: function() {
                        d.complete.call(this)
                    },
                    error: function() {
                        d.error.call(this)
                    }
                })
            }
        }()
    }
}(jQuery);