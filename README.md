# [Canadian In-Floor Radiant Solutions](http://www.infloor.ca): README
David Gaskin - July 2016

**Important: Before final deployment, update absolute paths on following pages to TLD: infloorheat.ca**
* notice_ie.asp - lines 29-30
* browser_detect.asp - line 14

##Overview:

### ASP Server Language
Website was built using classic ASP to minimize complications between source file crossover on existing server. The option to reframe website using updated ASP is open.

### Browser Compatibility and Graceful Degradation
Website is compatible with all major browsers including IE9 and above (users of IE8 and earlier will be intentionally redirected to a gentle suggestion to upgrade). Website is also able to function without JavaScript (with the exception of mobile devices).

### Responsive Design
Website is fully responsive and optimized to work on mobile devices common iOs devices (iPad, iPhone).

### Web Accessibility
WAI-ARIA specifications have been observed within a reasonable margin to allow for use of Screen Readers and Assistive Technologies (tests were conducted using NVDA Assistive Technology).

### Component Files Minimized
All component CSS and JS files have been condensed, compressed and minimized as have all main display images been resized to optimize load speed.

### Sitemap
An XML sitemap as per the [Sitemap 0.90 Protocol](http://www.sitemaps.org/) has been included in the build to help optimize Search Engine crawling.

##Additional Steps:
* Consider adding Header Expiry/Caching commands to static files and assets
