from flask import Flask, render_template, request

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

@app.route("/Puissance-4")
def Puissance4():
    return render_template("Puissance4.html")

@app.route("/Click")
def Click():
    return render_template("click.html") 

@app.route("/Cartes")
def Carte():
    return render_template("Cartes.html")

if __name__ == "__main__":
    import os
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port)