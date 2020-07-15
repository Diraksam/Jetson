from wsgiref.simple_server import make_server
from pyramid.config import Configurator
from pyramid.response import FileResponse # note it's FileResponse instead of Response

def jetson_server(req):
    return FileResponse("jetson_server.html")    # note that we are returning an actual document now!

if __name__ == '__main__':
    with Configurator() as config:
        config.add_route('jetson_server', '/')
        config.add_view(jetson_server, route_name='jetson_server')
        config.add_static_view(name='/', path='./public', cache_max_age=3600) #expose the public folder for the CSS file
        app = config.make_wsgi_app()
    server = make_server('0.0.0.0', 5000, app)
    server.serve_forever()
