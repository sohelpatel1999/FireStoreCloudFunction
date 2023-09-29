const keytocopy = ["id", "name", "age"]

    const datatocopy = {};

    keytocopy.forEach(element => {
        if(element === "id" || element === "age")
        datatocopy[element]=23
        
    });
    console.log(datatocopy);