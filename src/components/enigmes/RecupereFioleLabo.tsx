export default function RecupereFioleLabo({ resolu }: { resolu: boolean }) {
    return (
        <div>
            <h1>Casier</h1>
            {resolu ? (
                <p>Bravo tu as récupéré la clef du laboratoire !</p>
            ) : (
                <p>Tu n’as pas encore récupéré la clef du laboratoire.</p>
            )}
        </div>
    );
}
