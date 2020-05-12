
import hashlib
from collaborative_journal.model import db
from collaborative_journal.config import UPLOAD_FOLDER
from werkzeug import secure_filename
import os
from tempfile import mkstemp
import shutil
import json


def sha256sum(filename):
    """Return sha256 hash of file content, similar to UNIX sha256sum."""
    content = open(filename, 'rb').read()
    sha256_obj = hashlib.sha256(content)
    return sha256_obj.hexdigest()


class Post(db.Model):
    __table__name = 'posts'
    id = db.Column(db.Integer, primary_key=True)

    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    entry_filename = db.Column(db.String(100))

    title = db.Column(db.String(100))
    # filename = db.Column(db.String())


    def __repr__(self):
        return '<Post {}>\n\tuser_id:{}\n\ttitle:{}'.format(self.id, self.user_id, self.title)

    def create_filename(self, hashed_entry):
        self.entry_filename = secure_filename(os.path.join(str(self.user_id), hashed_entry))

    def get_relative_filename(self):
        return self.entry_filename

    def get_full_filename(self):
        print(UPLOAD_FOLDER)
        print(self.get_relative_filename())
        return os.path.join(UPLOAD_FOLDER, self.get_relative_filename())

    def save_post(self, entry_data):
        if not self.entry_filename:
            print(self.entry_filename)
            dummy, temp_filename = mkstemp()
            tempfile = open(temp_filename, 'w')
            tempfile.write(json.dumps(entry_data))
            tempfile.flush()
            self.create_filename(sha256sum(temp_filename))
            shutil.move(temp_filename, self.get_full_filename())

        else:
            print("saving (not first one)")
            file = open(self.get_full_filename(), 'w')
            file.write(json.dumps(entry_data))
            file.flush()

    def has_file(self):
        return self.entry_filename != None
            






