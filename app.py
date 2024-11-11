from flask import Flask, render_template

app = Flask(__name__)

@app.route('/')
def mainPage():
    return render_template('myPage_index.html')

if __name__ == '__main__':
    app.run(debug = True)