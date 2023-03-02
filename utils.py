from diffusers import (
    DDPMScheduler,
    DDIMScheduler,
    PNDMScheduler,
    LMSDiscreteScheduler,
    EulerDiscreteScheduler,
    EulerAncestralDiscreteScheduler,
    DPMSolverMultistepScheduler,
)

def update_scheduler(pipeline,name="PNDM"):
    if name == "LMSDiscrete":
        return LMSDiscreteScheduler.from_config(pipeline.scheduler.config)
    if name == "DDIM":
        return DDIMScheduler.from_config(pipeline.scheduler.config)
    if name == "DPMSolverMultistep":
        return DPMSolverMultistepScheduler.from_config(pipeline.scheduler.config)
    if name == "EulerDiscrete":
        return EulerDiscreteScheduler.from_config(pipeline.scheduler.config)
    if name == "PNDM":
        return PNDMScheduler.from_config(pipeline.scheduler.config)
    if name == "DDPM":
        return DDPMScheduler.from_config(pipeline.scheduler.config)
    if name == "EulerAncestralDiscrete":
        return EulerAncestralDiscreteScheduler.from_config(pipeline.scheduler.config)