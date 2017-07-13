function Map(rows, collumns) {
  this.SIZE = 32;
  this.enemies = [];
  this.cells = [];
  this.qtdMinasMapa = 5;
  for (var r = 0; r < rows; r++) {
    this.cells[r] = [];
    for (var c = 0; c < collumns; c++) {
      this.cells[r][c] = 0;
    }
  }
}

Map.prototype.desenhar = function (ctx) {
  for (var r = 0; r < this.cells.length; r++) {
    for (var c = 0; c < this.cells[0].length; c++) {
      if(this.cells[r][c] == 0 || this.cells[r][c] == 3 || this.cells[r][c] == 5){ //Chão Inicio
        ctx.fillStyle = "#CDCDCD";
        ctx.fillRect(c*this.SIZE, r*this.SIZE, this.SIZE, this.SIZE);
      }else if(this.cells[r][c] == 1){ // Parede
        ctx.fillStyle = "brown";
        ctx.fillRect(c*this.SIZE, r*this.SIZE, this.SIZE, this.SIZE);
	  }else if(this.cells[r][c] == 2){ //Chão Pizado
        ctx.fillStyle = "#FFF";
        ctx.fillRect(c*this.SIZE, r*this.SIZE, this.SIZE, this.SIZE);
      }else if(this.cells[r][c] == 4){ // Tesouro visivel
        ctx.fillStyle = "darkgreen";
        ctx.fillRect(c*this.SIZE, r*this.SIZE, this.SIZE, this.SIZE);
      }else if(this.cells[r][c] == 6){ // Mina visivel
        ctx.fillStyle = "red";
        ctx.fillRect(c*this.SIZE, r*this.SIZE, this.SIZE, this.SIZE);
      }
    }
  }
  for (var i = 0; i < this.enemies.length; i++) {
    this.enemies[i].desenhar(ctx);
  }
};

//aqui define onde vai ta as paredes e inimigos
Map.prototype.setCells = function (newCells) {
  for (var i = 0; i < newCells.length; i++) {
    for (var j = 0; j < newCells[i].length; j++) {
      switch (newCells[i][j]) {
        case 1:
          this.cells[i][j] = 1;
          break;
        case 2:
          this.cells[i][j] = 0;
          newEnemy = new Sprite();
          newEnemy.images = this.images;
          newEnemy.y = (i+0.5)*this.SIZE;
          newEnemy.x = (j+0.5)*this.SIZE;
          this.enemies.push(newEnemy);
          break;
        default:
          this.cells[i][j] = 0;
      }
    }
  }
  
  //add tesouros
  var w = 0;
  while(w < 5){
	var Tx = Math.floor((Math.random() * 10) + 1);
	var Ty = Math.floor((Math.random() * 11) + 1);
	if(this.cells[Tx][Ty] != 3 &&
	   this.cells[Tx][Ty] != 1 &&
	   this.cells[Tx][Ty] != 2 &&
	   !(Tx == 1 && Ty == 1)){
			this.cells[Tx][Ty] = 3;
			w++;
	}
  }
  
  //add minas
  w = 0;
  while(w < this.qtdMinasMapa){
	var Tx = Math.floor((Math.random() * 10) + 1);
	var Ty = Math.floor((Math.random() * 11) + 1);
	if(this.cells[Tx][Ty] != 3 &&
	   this.cells[Tx][Ty] != 1 &&
	   this.cells[Tx][Ty] != 2 &&
	   !(Tx == 1 && Ty == 1)){
			this.cells[Tx][Ty] = 5;
			w++;
	}
  }
};

Map.prototype.mover = function (dt) {
  for (var i = 0; i < this.enemies.length; i++) {
    this.enemies[i].mover(this,dt);
  }
};

/*Map.prototype.perseguir = function (alvo) {
  for (var i = 0; i < this.enemies.length; i++) {
    this.enemies[i].perseguir(alvo);
  }
};*/
