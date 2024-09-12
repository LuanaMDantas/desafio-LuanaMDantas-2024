class RecintosZoo {
  constructor() {
    this.recintos = [
      {
        numero: 1,
        bioma: "savana",
        tamanho: 10,
        animais: ["macaco", "macaco", "macaco"],
      },
      { numero: 2, bioma: "floresta", tamanho: 5, animais: [] },
      { numero: 3, bioma: "savana e rio", tamanho: 7, animais: ["gazela"] },
      { numero: 4, bioma: "rio", tamanho: 8, animais: [] },
      { numero: 5, bioma: "savana", tamanho: 9, animais: ["leao"] },
    ];

    this.animais = {
      LEAO: { tamanho: 3, biomas: ["savana"], carnivoro: true },
      LEOPARDO: { tamanho: 2, biomas: ["savana"], carnivoro: true },
      CROCODILO: { tamanho: 3, biomas: ["rio"], carnivoro: true },
      MACACO: { tamanho: 1, biomas: ["savana", "floresta"], carnivoro: false },
      GAZELA: { tamanho: 2, biomas: ["savana"], carnivoro: false },
      HIPOPOTAMO: { tamanho: 4, biomas: ["savana", "rio"], carnivoro: false },
    };
  }

  verificaRecinto(recinto, infoAnimal, quantidade, animal) {
    if (
      !infoAnimal.biomas.includes(recinto.bioma) &&
      recinto.bioma !== "savana e rio"
    ) {
      return false;
    }

    if (
      infoAnimal.carnivoro &&
      recinto.animais.length > 0 &&
      recinto.animais.some((a) => a !== animal.toLowerCase())
    ) {
      return false;
    }

    if (
      !infoAnimal.carnivoro &&
      recinto.animais.length > 0 &&
      recinto.animais.some((a) => this.animais[a.toUpperCase()].carnivoro)
    ) {
      return false;
    }

    const espacoOcupado = recinto.animais.reduce(
      (total, a) => total + this.animais[a.toUpperCase()].tamanho,
      0
    );
    const espacoNecessario = quantidade * infoAnimal.tamanho;
    const espacoExtra =
      recinto.animais.length > 0 &&
      recinto.animais.some((a) => a !== animal.toLowerCase())
        ? 1
        : 0;

    if (espacoOcupado + espacoNecessario + espacoExtra > recinto.tamanho) {
      return false;
    }

    if (
      animal.toUpperCase() === "HIPOPOTAMO" &&
      recinto.bioma !== "savana e rio" &&
      recinto.animais.length > 0
    ) {
      return false;
    }

    if (
      animal.toUpperCase() === "MACACO" &&
      quantidade === 1 &&
      recinto.animais.length === 0
    ) {
      return false;
    }

    return true;
  }
  analisaRecintos(animal, quantidade) {
    const infoAnimal = this.animais[animal.toUpperCase()];
    if (!infoAnimal) {
      return { erro: "Animal inválido" };
    }
    if (quantidade <= 0 || !Number.isInteger(quantidade)) {
      return { erro: "Quantidade inválida" };
    }

    const recintosViaveis = this.recintos
      .filter((recinto) =>
        this.verificaRecinto(recinto, infoAnimal, quantidade, animal)
      )
      .map((recinto) => {
        const espacoOcupado = recinto.animais.reduce(
          (total, a) => total + this.animais[a.toUpperCase()].tamanho,
          0
        );
        const espacoNecessario = quantidade * infoAnimal.tamanho;
        const espacoExtra =
          recinto.animais.length > 0 &&
          recinto.animais.some((a) => a !== animal.toLowerCase())
            ? 1
            : 0;
        const espacoLivre =
          recinto.tamanho - espacoOcupado - espacoNecessario - espacoExtra;

        return `Recinto ${recinto.numero} (espaço livre: ${espacoLivre} total: ${recinto.tamanho})`;
      });

    if (recintosViaveis.length === 0) {
      return { erro: "Não há recinto viável" };
    }

    return { recintosViaveis };
  }
}

export { RecintosZoo as RecintosZoo };
