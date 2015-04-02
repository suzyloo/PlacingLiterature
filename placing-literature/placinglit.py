import webapp2
import os
from google.appengine.ext.webapp import template


class MainPage(webapp2.RequestHandler):
	def get(self):
		template_values = {
            'greetings': '',
            'url': '',
            'url_linktext': '',
        }
		path = os.path.join(os.path.dirname(__file__), 'Compiled/index.html')
		self.response.headers['Content-Type'] = 'text/html'
		self.response.out.write(template.render(path, template_values))

class AboutPage(webapp2.RequestHandler):
	def get(self):
		template_values = {
            'greetings': '',
            'url': '',
            'url_linktext': '',
        }
		path = os.path.join(os.path.dirname(__file__), 'Compiled/about.html')
		self.response.headers['Content-Type'] = 'text/html'
		self.response.out.write(template.render(path, template_values))

class AuthorSpotlightPage(webapp2.RequestHandler):
	def get(self):
		template_values = {
            'greetings': '',
            'url': '',
            'url_linktext': '',
        }
		path = os.path.join(os.path.dirname(__file__), 'Compiled/author-spotlight.html')
		self.response.headers['Content-Type'] = 'text/html'
		self.response.out.write(template.render(path, template_values))

class CollectionsPage(webapp2.RequestHandler):
	def get(self):
		template_values = {
            'greetings': '',
            'url': '',
            'url_linktext': '',
        }
		path = os.path.join(os.path.dirname(__file__), 'Compiled/collections.html')
		self.response.headers['Content-Type'] = 'text/html'
		self.response.out.write(template.render(path, template_values))
        
class PodcastsPage(webapp2.RequestHandler):
	def get(self):
		template_values = {
            'greetings': '',
            'url': '',
            'url_linktext': '',
        }
		path = os.path.join(os.path.dirname(__file__), 'Compiled/podcasts.html')
		self.response.headers['Content-Type'] = 'text/html'
		self.response.out.write(template.render(path, template_values))


application = webapp2.WSGIApplication([
	('/', MainPage),
	('/about', AboutPage),
	('/authorspotlight', AuthorSpotlightPage),
	('/collections', CollectionsPage),
    ('/podcasts', PodcastsPage),
], debug=True)
