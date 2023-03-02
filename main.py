from flask_ngrok import run_with_ngrok
from flask import Flask, render_template, request
import torch
from diffusers import StableDiffusionPipeline
import base64
from io import BytesIO
import utils




DEVICE = 'cpu'
if torch.cuda.is_available():
  DEVICE = 'cuda'

# Load model
pipe = StableDiffusionPipeline.from_pretrained("runwayml/stable-diffusion-v1-5")
                                              
                                               



#Start flask app and set to ngrok
app = Flask(__name__)
run_with_ngrok(app)

@app.route('/')
def initial():
  return render_template('index.html')


@app.route('/submit-prompt', methods=['POST'])
def generate_image():

  generator = torch.Generator(device=DEVICE).manual_seed(int(request.form['seed']))
  prompt = request.form['prompt-input']
  scheduler_name = request.form['scheduler']

  if scheduler_name:
    pipe.scheduler = utils.update_scheduler(pipeline=pipe,name=scheduler_name)
  if request.form['gpu'] == "true":
    pipe.to(DEVICE)
  else:
    pipe.to("cpu")
  
  image = pipe(prompt,generator=generator).images[0]
  
  buffered = BytesIO()
  image.save(buffered, format="PNG")
  img_str = base64.b64encode(buffered.getvalue())
  img_str = "data:image/png;base64," + str(img_str)[2:-1]

  print("Sending image ...")
  return img_str,200


if __name__ == '__main__':
    app.run()