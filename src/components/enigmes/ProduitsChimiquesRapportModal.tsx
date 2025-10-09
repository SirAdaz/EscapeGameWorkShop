export default function ProduitsChimiquesRapport() {
  return (
    <div className="bg-white text-black p-8 max-w-4xl mx-auto shadow-lg max-h-150 overflow-y-auto margin-top-4" style={{fontFamily: 'Times New Roman, serif'}}>
      {/* En-tête du document */}
      <div className="text-center mb-8">
        <div className="border-2 border-black p-4 mb-4">
          <h1 className="text-2xl font-bold uppercase tracking-wider">RAPPORT D'ANALYSE</h1>
          <h2 className="text-lg font-semibold mt-2">Dossier "Produits chimiques"</h2>
          <p className="text-sm italic mt-1">Note interne laboratoire R.C.H.</p>
        </div>
      </div>

      {/* Informations de référence */}
      <div className="mb-6">
        <table className="w-full border-collapse border border-black text-sm">
          <tbody>
            <tr>
              <td className="border border-black p-2 font-semibold bg-gray-100 w-1/4">Référence :</td>
              <td className="border border-black p-2">PC-7B / Section Expérimentale</td>
              <td className="border border-black p-2 font-semibold bg-gray-100 w-1/4">Date :</td>
              <td className="border border-black p-2">12 avril 2105</td>
            </tr>
            <tr>
              <td className="border border-black p-2 font-semibold bg-gray-100">Rédacteur principal :</td>
              <td className="border border-black p-2">Dr. Élodie Ménard</td>
              <td className="border border-black p-2 font-semibold bg-gray-100">Participants :</td>
              <td className="border border-black p-2">Marc Delattre, Clara H., S. Lefèvre, Antoine B., Dr. Rousseau</td>
            </tr>
          </tbody>
        </table>
        <div className="mt-3 p-3 bg-red-100 border-2 border-red-500 text-red-800 text-center font-bold">
          ⚠️ ACCÈS RESTREINT – NE PAS DIFFUSER HORS DU SERVICE
        </div>
      </div>

      {/* Contenu principal */}
      <div className="space-y-6 text-sm leading-relaxed">
        <div>
          <h3 className="font-bold text-lg mb-3 underline">1. ANALYSES LUNARIS-7</h3>
          <p className="mb-3">
            Les analyses de la série Lunaris-7 ont été poursuivies ce matin. Le composé présente toujours une <strong>teinte bleutée métallique</strong> et reste légèrement corrosif au contact prolongé. M. Delattre a noté que la substance semble réagir de manière anormale dès qu'elle est exposée à une source lumineuse directe, provoquant une <strong>brève luminescence argentée</strong>, avant de redevenir incolore.
          </p>
          <p className="mb-3">
            Aucune odeur notable n'a été détectée à température ambiante, mais un effet piquant a été ressenti par S. Lefèvre lors du test sensoriel à 45 °C. À noter également : le <strong>pH instable (entre 2,3 et 3,1)</strong> selon les lots, susceptible d'altérer les autres échantillons stockés à proximité.
          </p>
        </div>

        <div>
          <h3 className="font-bold text-lg mb-3 underline">2. RÉSIDU VÉRIDIAN</h3>
          <p className="mb-3">
            Le résidu de Véridian — solution visqueuse d'aspect <strong>vert pâle</strong> — a présenté un comportement inattendu lors du troisième essai : un <strong>reflet doré transitoire</strong> est apparu, avant de se figer. Clara H. a confirmé que la réaction semble dépendre du nombre de gouttes ajoutées au mélange ; au-delà de sept, la texture devient pâteuse et perd toute solubilité.
          </p>
          <p className="mb-3">
            L'ensemble du groupe s'accorde sur la <strong>forte sensibilité du composé à la chaleur et à l'humidité</strong>.
          </p>
        </div>

        <div>
          <h3 className="font-bold text-lg mb-3 underline">3. TESTS ECLIPTANE</h3>
          <p className="mb-3">
            Les tests de confinement menés par Nathan V. sur le gaz Ecliptane confirment son <strong>caractère inflammable</strong>. Incolore et inodore, il provoque cependant une légère irritation oculaire après une exposition de plus de 40 secondes. Lucie R. a signalé une <strong>décharge électrostatique spontanée</strong> lors de la manipulation, probablement due à la proximité du réservoir C7.
          </p>
        </div>

        <div>
          <h3 className="font-bold text-lg mb-3 underline">4. ÉCHANTILLON AURÉON</h3>
          <p className="mb-3">
            L'échantillon solide nommé Auréon — étudié par le Pr. Duret et L. Perrin — reste stable à l'air libre. Les <strong>cristaux ambrés</strong> sont non solubles, mais deviennent hautement conducteurs lorsqu'ils sont légèrement humidifiés. Une interaction imprévue a été observée lorsque de faibles quantités de Lunaris-7 ont été déposées à la surface : une <strong>réaction lumineuse fugace</strong>, accompagnée d'un signal spectral codé <strong>"7-4-3-1"</strong>.
          </p>
        </div>

        <div>
          <h3 className="font-bold text-lg mb-3 underline">5. NOTE COMPLÉMENTAIRE</h3>
          <p className="mb-3">
            Les produits mentionnés ci-dessus semblent partager un comportement réactif commun, identifié provisoirement sous le code <strong>L.V.E.A.</strong> (initiales des composés).
          </p>
          <p className="mb-3">
            Toute tentative de combinaison doit être effectuée en atmosphère contrôlée, avec autorisation du chef de section.
          </p>
          <p className="mb-3">
            Un double du présent rapport a été archivé dans l'armoire 7B – tiroir inférieur, sous scellé rouge.
          </p>
        </div>
      </div>
    </div>
  );
}
