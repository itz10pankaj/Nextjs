<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0"
  xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
  xmlns:s="http://www.sitemaps.org/schemas/sitemap/0.9">

  <xsl:output method="html" encoding="UTF-8" />

  <xsl:template match="/">
    <html>
      <head>
        <title>Sitemap Index</title>
        <style>
          body { font-family: Arial, sans-serif; margin: 20px; }
          table { border-collapse: collapse; width: 80%; }
          th, td { border: 1px solid #ddd; padding: 8px; }
          th { background-color: #f9f9f9; }
          a { color: #1a0dab; text-decoration: none; }
        </style>
      </head>
      <body>
        <h2>Sitemap Index</h2>
        <table>
          <tr>
            <th>Sitemap URL</th>
          </tr>
          <xsl:for-each select="s:sitemapindex/s:sitemap">
            <tr>
              <td>
                <a href="{s:loc}">
                  <xsl:value-of select="s:loc"/>
                </a>
              </td>
            </tr>
          </xsl:for-each>
        </table>
      </body>
    </html>
  </xsl:template>

</xsl:stylesheet>
