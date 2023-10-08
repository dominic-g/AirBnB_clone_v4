#!/usr/bin/python3
""" Starts a Flash Web Application """
from models import storage
from models.state import State
from models.city import City
from models.amenity import Amenity
from models.place import Place
from os import environ
from flask import Flask, render_template
import uuid
app = Flask('web_dynamic')
# app.url_map.strict_slashes = False
# app.jinja_env.trim_blocks = True
# app.jinja_env.lstrip_blocks = True


@app.teardown_appcontext
def close_db(*args, **kwargs):
    """ Remove the current SQLAlchemy Session """
    storage.close()


@app.route('/0-hbnb', strict_slashes=False)
def show_hbnb():
    """ HBNB is alive! """
    """
    might have been a mistake on their side
    if 100-hbnb.html is not present use 8-hbnb.html
    if os.path.isfile('templates/100-hbnb.html'):
        template_name = '100-hbnb.html'
    else:
        template_name = '8-hbnb.html'
    """
    states = storage.all('State')
    amenities = storage.all('Amenity')
    places = storage.all('Place')
    cache_id = uuid.uuid4()
    return render_template('0-hbnb.html',
                           states=states,
                           amenities=amenities,
                           places=places,
                           cache_id=cache_id)


if __name__ == "__main__":
    """ Main Function """
    app.run(host='0.0.0.0', port=5000)
