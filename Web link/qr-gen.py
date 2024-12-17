import qrcode

# Data you want to encode
data = "https://debjoygame.tiiny.site/"

# Create QR code
qr = qrcode.QRCode(
    version=1,  # controls the size of the QR code (1 is the smallest)
    error_correction=qrcode.constants.ERROR_CORRECT_L,  # Error correction level
    box_size=10,  # Size of each box
    border=4,  # Thickness of the border
)
qr.add_data(data)
qr.make(fit=True)

# Create an image from the QR code
img = qr.make_image(fill='black', back_color='white')

# Save the image
img.save("my_qr_code.png")