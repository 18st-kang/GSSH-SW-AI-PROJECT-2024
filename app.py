from flask import Flask, render_template

app = Flask(__name__)

@app.route('/')
def mainPage():
    return render_template('myPage_index.html')

@app.route('/mypage')
def myPage():
    return render_template('myPage_index.html')

@app.route('/problems')
def selectProblems():
    return render_template('selectProblems_index.html')

@app.route('/subjects')
def selectSubjects():
    return render_template('selectSubjects_index.html')

if __name__ == '__main__':
    app.run(debug = True)