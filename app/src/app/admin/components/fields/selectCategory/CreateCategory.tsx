import { useState } from "react";



function CreateCategory() {
    const [Toogle, setToogle] = useState(false);

    return (
        <div className="">
            {
                !Toogle ?
                <div>
                    <button>Crear Categoria</button>
                </div>
                :
                <div>

                </div>
            }
        </div>
    )
}

export default CreateCategory