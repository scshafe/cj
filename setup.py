
from setuptools import setup

setup(
    name='collaborative_journal',
    version='0.1.0',
    packages=['collaborative_journal'],
    include_package_data=True,
    install_requires=[
        'flask',
        'sh',
        'Flask-Testing',
        'selenium',
        'requests',
        'arrow',
        'nodeenv'
    ],
)