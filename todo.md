#Todo list

**Important: Before final deployment, update absolute paths on following pages to TLD: infloorheat.ca**
* notice_ie.asp - lines 29-30
* browser_detect.asp - line 14
* Consider adding Header Expiry/Caching commands to static files and assets

## Todo
* Project search: notice_ie.php
* costs examples page breaks if both global styles and cost table styles are included together!
* Examine script usage and structure.
	* default.js is a combination of all scripts on the page. Review script usage and place script chunks into appropriate files (for reference, infloor.js contains scripts for some functionality, where default.js contains **all** scripts)
	* examine all pages and footer to audit scripts being used
* re-minify production files, or setup a minification workflow if not wanting to do it manually
* add fallback for if no internet or jquery is disabled as, without these things, the page looks like shit
* fix toggle of figures aria-hidden attribute; note this happens on multiple pages and should use a global script to manage this
* review using title attrs for images. These are used in pop out modals.

## 404 page
Create a custom 404 page
* Notify users that the page they are looking for cannot be found or doesn't exist
* Maintain the same look and feel of the rest of the site
* Consider adding links to the most popular pages or to the home page to engage the visitor quickly
* Think about allowing the visitor to report a broken links
* Make sure the page is returning a status 404 so that it does not get indexed by Search Engines

## SEO
* Test and optimize page speed
* SEO review
* Microformatting what can be microformatted

### SEO Todo
Conduct a SEO review of CIRS website. Try to add more definition to search terms.
Also, consider microformats and creating a Rich Card for CIRS.
* Every page has the same meta info
* Many pages share the same headings and have multiple H1s/H2s
* Could have robots.txt ignore some extraneous image files/junk files
* Be sure to add a 301 permanent redirect from infloorheat.ca
* consider images - do they fulfill SEO strategy? If so, optimize them, if not, ignore them.
