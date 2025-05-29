# fichier: app.py
from flask import Flask, render_template

app = Flask(__name__)

@app.route("/")
def accueil():
    return render_template("Home.html")

@app.route("/Bandit-Manchot")
def Machine():
    return render_template("BanditManchot.html")

@app.route("/Morpion")
def Morpion():
    return render_template("Morpion.html")

@app.route("/Roulette")
def Roulette():
    return render_template("Roulette.html")

@app.route("/test")
def test():
    return render_template("test.html") 

if __name__ == "__main__":
    app.run(debug=True, port=5000)
