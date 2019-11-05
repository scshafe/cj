
import hashlib
from collaborative_journal.model import db
from collaborative_journal.config import UPLOAD_FOLDER
from werkzeug import secure_filename
import os


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

