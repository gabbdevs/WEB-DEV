document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('paymentForm');

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = form.querySelector('input[placeholder="Name"]').value.trim();
        const email = form.querySelector('input[placeholder="name@gmail.com"]').value.trim();
        const address = form.querySelector('input[placeholder="123 Street, City, Country"]').value.trim();

        const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
        if (cartItems.length === 0) {
            alert("Your cart is empty!");
            return;
        }

        // Convert prices and quantities to numbers
        const sanitizedItems = cartItems.map(item => ({
            name: item.name,
            price: parseFloat(item.price) || 0,
            quantity: parseInt(item.quantity) || 0
        }));

        // Calculate total
        const total = cartItems
            .reduce((sum, item) => sum + Number(item.price) * Number(item.quantity), 0)
            .toFixed(2);


        const receipt = {
            name,
            email,
            address,
            items: cartItems,
            total: cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2),
            date: new Date().toLocaleString(),
            receiptId: 'OTL-' + Math.floor(Math.random() * 1000000)
        };

        localStorage.setItem('latestReceipt', JSON.stringify(receipt));

        alert("Payment successful! Generating your receipt...");
        window.location.href = 'receipt.html';
    });
});