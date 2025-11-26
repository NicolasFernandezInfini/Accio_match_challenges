"""
Django settings package
"""
from .base import *

# Try to import local settings
try:
    from .local import *
except ImportError:
    pass
